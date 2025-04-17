import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useProduct } from '../context/ProductContext';

function Compare() {
    const { state, dispatch } = useProduct();
    const { compareList } = state;

    const handleRemove = (productId) => {
        dispatch({ type: 'REMOVE_FROM_COMPARE', payload: productId });
    };

    const handleClearAll = () => {
        dispatch({ type: 'CLEAR_COMPARE' });
    };

    if (compareList.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Compare Products</h2>
                    <p className="text-gray-500">No products to compare</p>
                    <Link
                        to="/products"
                        className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Compare Products</h2>
                <button
                    onClick={handleClearAll}
                    className="text-red-600 hover:text-red-700"
                >
                    Clear All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Feature
                            </th>
                            {compareList.map((product) => (
                                <th key={product._id} className="px-6 py-3">
                                    <div className="relative">
                                        <button
                                            onClick={() => handleRemove(product._id)}
                                            className="absolute -top-2 -right-2 text-gray-500 hover:text-red-600"
                                        >
                                            <FaTimes />
                                        </button>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-32 h-32 object-cover mx-auto"
                                        />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            {product.name}
                                        </h3>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Price
                            </td>
                            {compareList.map((product) => (
                                <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${product.price}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Category
                            </td>
                            {compareList.map((product) => (
                                <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.category}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Rating
                            </td>
                            {compareList.map((product) => (
                                <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.rating} / 5
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Stock
                            </td>
                            {compareList.map((product) => (
                                <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.countInStock}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Description
                            </td>
                            {compareList.map((product) => (
                                <td key={product._id} className="px-6 py-4 text-sm text-gray-500">
                                    {product.description}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Action
                            </td>
                            {compareList.map((product) => (
                                <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Compare;
