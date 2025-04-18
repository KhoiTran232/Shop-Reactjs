import React from 'react';
import { FaStar } from 'react-icons/fa';
import moment from 'moment';

function ReviewList({ reviews }) {
    return (
        <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet</p>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b pb-6">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className="w-5 h-5"
                                            color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-600">
                                    {moment(review.createdAt).format('MMMM D, YYYY')}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-800">{review.comment}</p>
                            <p className="mt-1 text-sm text-gray-600">
                                By {review.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReviewList;
