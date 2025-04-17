import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import api from '../utils/api';

function ProductReview({ productId, onReviewAdded }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`/products/${productId}/reviews`, {
                rating,
                comment
            });
            onReviewAdded(data);
            setRating(0);
            setComment('');
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium">Write a Review</h3>
            {error && (
                <div className="mt-2 text-red-600">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    className="hidden"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    className="w-6 h-6"
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            </label>
                        );
                    })}
                </div>
                <div>
                    <textarea
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full border rounded-md px-3 py-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={!rating}
                    className={`mt-4 px-4 py-2 rounded-md text-white ${
                        rating ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400'
                    }`}
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}

export default ProductReview;
