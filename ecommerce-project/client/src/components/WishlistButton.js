import React from 'react';
import { useProduct } from '../context/ProductContext';

function WishlistButton({ productId }) {
    const { state, addToWishlist, removeFromWishlist } = useProduct();
    const isInWishlist = state.wishlist.includes(productId);

    const handleWishlistClick = () => {
        if (isInWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    return (
        <button
            onClick={handleWishlistClick}
            className={`p-2 rounded-full ${
                isInWishlist ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    );
}

export default WishlistButton;
