import React, { useState, useEffect } from 'react';
import { FaUsers, FaShoppingCart, FaBox, FaDollarSign } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../../utils/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0
    });
    const [salesData, setSalesData] = useState({
        labels: [],
        datasets: []
    });
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/admin/stats');
            setStats(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600 p-4">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaUsers className="h-8 w-8 text-indigo-600" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Tổng số người dùng</p>
                            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaShoppingCart className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                            <p className="text-2xl font-semibold">{stats.totalOrders}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaBox className="h-8 w-8 text-yellow-600" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                            <p className="text-2xl font-semibold">{stats.totalProducts}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaDollarSign className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Tổng doanh thu</p>
                            <p className="text-2xl font-semibold">${stats.totalRevenue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
