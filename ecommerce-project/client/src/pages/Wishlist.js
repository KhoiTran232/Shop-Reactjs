import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

function Wishlist() {
    const { state, dispatch } = useProduct();
    const { wishlist } = state;

    const handleRemove = (product) => {
        dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    };

    if (wishlist.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
                    <p className="text-gray-500">No products in your wishlist</p>
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
            <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                    <div key={product._id} className="relative">
                        <button
                            onClick={() => handleRemove(product)}
                            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md text-red-600 hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
