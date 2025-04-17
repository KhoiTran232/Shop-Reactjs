import React from 'react';
import { Link } from 'react-router-dom';
import CompareButton from './CompareButton';
import WishlistButton from './WishlistButton';

function ProductCard({ product }) {
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return '/images/placeholder.jpg';
        }
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        return `http://localhost:5000/${imagePath.replace(/^\//, '')}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
                <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                    }}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                    <CompareButton productId={product._id} />
                    <WishlistButton productId={product._id} />
                </div>
            </div>
            
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                </Link>
                
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                className={`h-5 w-5 ${
                                    index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                        ({product.numReviews || 0} reviews)
                    </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold">${product.price?.toFixed(2)}</span>
                    <span className={`text-sm px-2 py-1 rounded-full
                        ${product.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}`}
                    >
                        {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                </div>

                <Link
                    to={`/product/${product._id}`}
                    className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
