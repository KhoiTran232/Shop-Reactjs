import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import ProductReview from '../components/ProductReview';
import ReviewList from '../components/ReviewList';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            setError('Không thể tải thông tin sản phẩm');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const handleReviewAdded = () => {
        fetchProduct();
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return '/images/placeholder.jpg';
        }
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        return `http://localhost:5000/${imagePath.replace(/^\//, '')}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center p-4">
                Không tìm thấy sản phẩm
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Phần hình ảnh */}
                <div className="relative">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder.jpg';
                        }}
                    />
                </div>

                {/* Phần thông tin sản phẩm */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
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
                        <span className="text-gray-600 ml-2">
                            ({product.numReviews || 0} đánh giá)
                        </span>
                    </div>

                    <div className="text-3xl font-bold mb-4">
                        ${product.price?.toFixed(2)}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div className="mb-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold
                            ${product.stock > 0 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'}`}
                        >
                            {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                    </div>

                    {product.stock > 0 && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số lượng:
                            </label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.stock}
                            className={`flex-1 py-3 px-6 rounded-md text-white font-medium
                                ${product.stock 
                                    ? 'bg-blue-600 hover:bg-blue-700' 
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            disabled={!product.stock}
                            className={`flex-1 py-3 px-6 rounded-md text-white font-medium
                                ${product.stock 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Xem giỏ hàng
                        </button>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Thương hiệu</h3>
                        <p>{product.brand}</p>
                        
                        <h3 className="text-lg font-semibold mt-4 mb-2">Danh mục</h3>
                        <p>{product.category}</p>
                    </div>
                </div>
            </div>

            {/* Phần đánh giá */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm</h2>
                <ProductReview productId={id} onReviewAdded={handleReviewAdded} />
                <ReviewList reviews={product.reviews} />
            </div>
        </div>
    );
}

export default ProductDetail;
