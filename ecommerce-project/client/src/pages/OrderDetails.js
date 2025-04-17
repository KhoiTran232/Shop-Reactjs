import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderApi } from '../utils/api';

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await orderApi.getOrder(id);
                setOrder(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Không thể tải thông tin đơn hàng');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Chi tiết đơn hàng #{order._id}</h1>

                {/* Order Status */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Trạng thái đơn hàng</h2>
                    <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Địa chỉ:</span> {order.shippingAddress.address}</p>
                        <p><span className="font-medium">Thành phố:</span> {order.shippingAddress.city}</p>
                        <p><span className="font-medium">Mã bưu điện:</span> {order.shippingAddress.postalCode}</p>
                        <p><span className="font-medium">Quốc gia:</span> {order.shippingAddress.country}</p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sản phẩm đặt mua</h2>
                    <div className="space-y-4">
                        {order.orderItems.map((item) => (
                            <div key={item._id} className="flex justify-between items-center border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Tổng quan đơn hàng</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Tổng tiền hàng:</span>
                            <span>{order.itemsPrice.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí vận chuyển:</span>
                            <span>{order.shippingPrice.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Tổng cộng:</span>
                            <span>{order.totalPrice.toLocaleString('vi-VN')}₫</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
