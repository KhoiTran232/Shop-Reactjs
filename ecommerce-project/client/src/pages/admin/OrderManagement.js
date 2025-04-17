import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, pending, paid, delivered

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/admin');
            setOrders(data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        switch (filter) {
            case 'pending':
                return !order.isPaid;
            case 'paid':
                return order.isPaid && !order.isDelivered;
            case 'delivered':
                return order.isDelivered;
            default:
                return true;
        }
    });

    const updateOrderStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            fetchOrders();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
                    
                    {/* Filter Controls */}
                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded ${
                                filter === 'all' 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            Tất cả
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded ${
                                filter === 'pending' 
                                    ? 'bg-yellow-600 text-white' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            Chưa thanh toán
                        </button>
                        <button
                            onClick={() => setFilter('paid')}
                            className={`px-4 py-2 rounded ${
                                filter === 'paid' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            Đã thanh toán
                        </button>
                        <button
                            onClick={() => setFilter('delivered')}
                            className={`px-4 py-2 rounded ${
                                filter === 'delivered' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            Đã giao hàng
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đặt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <Link 
                                            to={`/order/${order._id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            {order._id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.user.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {order.user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col space-y-1">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.isPaid 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                            </span>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.isDelivered 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {order.isDelivered ? 'Đã giao hàng' : 'Đang giao hàng'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {!order.isPaid && (
                                                <button
                                                    onClick={() => updateOrderStatus(order._id, 'paid')}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Đánh dấu đã thanh toán
                                                </button>
                                            )}
                                            {order.isPaid && !order.isDelivered && (
                                                <button
                                                    onClick={() => updateOrderStatus(order._id, 'delivered')}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Đánh dấu đã giao hàng
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderManagement;
