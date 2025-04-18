import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { orderApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=orders');
            return;
        }

        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await orderApi.getMyOrders();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                if (error.response?.status === 401) {
                    navigate('/login?redirect=orders');
                } else {
                    setError(error.response?.data?.message || 'Không thể tải danh sách đơn hàng');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Shipped':
                return 'bg-purple-100 text-purple-800';
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Pending':
                return 'Chờ xử lý';
            case 'Processing':
                return 'Đang xử lý';
            case 'Shipped':
                return 'Đang giao hàng';
            case 'Delivered':
                return 'Đã giao hàng';
            case 'Cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded mb-4"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
                        <Link 
                            to="/" 
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Link
                                key={order._id}
                                to={`/order/${order._id}`}
                                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900">Đơn hàng #{order._id}</p>
                                        <p className="text-sm text-gray-600">
                                            Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                        </p>
                                        <div className="mt-2">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">
                                            {order.totalPrice.toLocaleString('vi-VN')}₫
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {order.orderItems.length} sản phẩm
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {order.orderItems.slice(0, 3).map((item) => (
                                        <div key={item._id} className="flex items-center space-x-2">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {item.name} x {item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                    {order.orderItems.length > 3 && (
                                        <span className="text-sm text-gray-500">
                                            +{order.orderItems.length - 3} sản phẩm khác
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
