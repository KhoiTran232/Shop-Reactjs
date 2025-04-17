import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function OrderTracking() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!order) return <div>Order not found</div>;

    const steps = [
        { title: 'Đặt hàng', completed: true, date: order.createdAt },
        { title: 'Xác nhận', completed: order.isPaid, date: order.paidAt },
        { title: 'Đang giao hàng', completed: order.isDelivered, date: order.deliveredAt },
        { title: 'Đã giao hàng', completed: order.isDelivered, date: order.deliveredAt }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Theo dõi đơn hàng #{order._id}</h1>

                {/* Progress Steps */}
                <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                            style={{ width: `${(steps.filter(step => step.completed).length / steps.length) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                        ></div>
                    </div>
                    <div className="flex justify-between">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                                    step.completed ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                                }`}>
                                    {step.completed ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <div className="text-sm mt-2">{step.title}</div>
                                {step.completed && step.date && (
                                    <div className="text-xs text-gray-500">
                                        {new Date(step.date).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Details */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
                        <div className="space-y-2">
                            <p><span className="font-medium">Ngày đặt:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><span className="font-medium">Tổng tiền:</span> ${order.totalPrice}</p>
                            <p><span className="font-medium">Phương thức thanh toán:</span> {order.paymentMethod}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h2>
                        <div className="space-y-2">
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>
                    <div className="space-y-4">
                        {order.orderItems.map((item) => (
                            <div key={item._id} className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderTracking;
