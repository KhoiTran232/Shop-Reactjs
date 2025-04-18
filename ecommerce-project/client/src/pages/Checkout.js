import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PaymentMethod from '../components/PaymentMethod';
import { orderApi } from '../utils/api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const ShippingAddressSchema = Yup.object().shape({
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    city: Yup.string().required('Vui lòng nhập thành phố'),
    postalCode: Yup.string().required('Vui lòng nhập mã bưu điện'),
    country: Yup.string().required('Vui lòng nhập quốc gia')
});

function Checkout() {
    const [step, setStep] = useState(1);
    const { cartItems, shippingAddress, saveShippingAddress, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!user || !token) {
            navigate('/login', { 
                state: { from: '/checkout' },
                replace: true 
            });
        }
    }, [user, navigate]);

    const calculateItemsTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateShippingPrice = (itemsTotal) => {
        return itemsTotal > 100 ? 0 : 10;
    };

    const handleShippingSubmit = (values) => {
        saveShippingAddress(values);
        setStep(2);
    };

    const handlePaymentMethodSelect = async (method) => {
        try {
            setError(null);
            setIsLoading(true);

            const token = localStorage.getItem('token');
            if (!user || !token) {
                setError('Vui lòng đăng nhập để tiếp tục');
                navigate('/login', { 
                    state: { from: '/checkout' },
                    replace: true 
                });
                return;
            }

            // Validate cart
            if (!cartItems?.length) {
                setError('Giỏ hàng trống');
                return;
            }

            // Validate shipping address
            if (!shippingAddress?.address || !shippingAddress?.city || 
                !shippingAddress?.postalCode || !shippingAddress?.country) {
                setError('Vui lòng nhập đầy đủ thông tin địa chỉ giao hàng');
                setStep(1);
                return;
            }

            const itemsPrice = calculateItemsTotal();
            const shippingPrice = calculateShippingPrice(itemsPrice);

            // Ensure all cart items have required fields
            const validatedCartItems = cartItems.map(item => ({
                name: String(item.name),
                quantity: Number(item.quantity),
                image: String(item.image || 'default-product-image.jpg'),
                price: Number(item.price),
                product: String(item._id) // Make sure this is the correct product ID
            }));

            const orderData = {
                orderItems: validatedCartItems,
                shippingAddress: {
                    address: String(shippingAddress.address),
                    city: String(shippingAddress.city),
                    postalCode: String(shippingAddress.postalCode),
                    country: String(shippingAddress.country)
                },
                paymentMethod: String(method),
                itemsPrice: Number(itemsPrice),
                shippingPrice: Number(shippingPrice),
                totalPrice: Number(itemsPrice + shippingPrice)
            };

            console.log('Sending order data:', orderData);

            const response = await orderApi.createOrder(orderData);
            
            if (response?.data?._id) {
                clearCart();
                navigate(`/order/${response.data._id}`);
            } else {
                throw new Error('Không nhận được thông tin đơn hàng');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            if (error.response?.status === 401) {
                setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                navigate('/login', { 
                    state: { from: '/checkout' },
                    replace: true 
                });
            } else {
                setError(
                    error.response?.data?.message || 
                    'Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.'
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const renderOrderSummary = () => {
        const itemsTotal = calculateItemsTotal();
        const shippingPrice = calculateShippingPrice(itemsTotal);
        
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold mb-2">Tổng quan đơn hàng</h3>
                {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between mb-2">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                    </div>
                ))}
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                        <span>Tổng tiền hàng:</span>
                        <span>{itemsTotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí vận chuyển:</span>
                        <span>{shippingPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                        <span>Tổng cộng:</span>
                        <span>{(itemsTotal + shippingPrice).toLocaleString('vi-VN')}₫</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderShippingForm = () => (
        <Formik
            initialValues={shippingAddress || {
                address: '',
                city: '',
                postalCode: '',
                country: 'Việt Nam'
            }}
            validationSchema={ShippingAddressSchema}
            onSubmit={handleShippingSubmit}
        >
            {({ errors, touched }) => (
                <Form className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Địa chỉ</label>
                        <Field
                            name="address"
                            className="w-full p-2 border rounded"
                            placeholder="Nhập địa chỉ của bạn"
                        />
                        {errors.address && touched.address && (
                            <div className="text-red-500 text-sm mt-1">{errors.address}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Thành phố</label>
                        <Field
                            name="city"
                            className="w-full p-2 border rounded"
                            placeholder="Nhập thành phố"
                        />
                        {errors.city && touched.city && (
                            <div className="text-red-500 text-sm mt-1">{errors.city}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Mã bưu điện</label>
                        <Field
                            name="postalCode"
                            className="w-full p-2 border rounded"
                            placeholder="Nhập mã bưu điện"
                        />
                        {errors.postalCode && touched.postalCode && (
                            <div className="text-red-500 text-sm mt-1">{errors.postalCode}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Quốc gia</label>
                        <Field
                            name="country"
                            className="w-full p-2 border rounded"
                            placeholder="Nhập quốc gia"
                        />
                        {errors.country && touched.country && (
                            <div className="text-red-500 text-sm mt-1">{errors.country}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Tiếp tục
                    </button>
                </Form>
            )}
        </Formik>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {renderOrderSummary()}
                {step === 1 ? renderShippingForm() : (
                    <PaymentMethod 
                        onSubmit={handlePaymentMethodSelect}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}

export default Checkout;
