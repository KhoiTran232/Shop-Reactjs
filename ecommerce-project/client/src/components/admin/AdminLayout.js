import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
    FaChartLine, 
    FaBox, 
    FaUsers, 
    FaShoppingCart,
    FaPercent,
    FaCog
} from 'react-icons/fa';

function AdminLayout() {
    const location = useLocation();

    const menuItems = [
        {
            path: '/admin/dashboard',
            name: 'Dashboard',
            icon: <FaChartLine className="w-5 h-5" />
        },
        {
            path: '/admin/products',
            name: 'Quản lý sản phẩm',
            icon: <FaBox className="w-5 h-5" />
        },
        {
            path: '/admin/orders',
            name: 'Quản lý đơn hàng',
            icon: <FaShoppingCart className="w-5 h-5" />
        },
        {
            path: '/admin/users',
            name: 'Quản lý người dùng',
            icon: <FaUsers className="w-5 h-5" />
        },
        {
            path: '/admin/coupons',
            name: 'Mã giảm giá',
            icon: <FaPercent className="w-5 h-5" />
        },
        {
            path: '/admin/settings',
            name: 'Cài đặt',
            icon: <FaCog className="w-5 h-5" />
        }
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                                location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
                            }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
