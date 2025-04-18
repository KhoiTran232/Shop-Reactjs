import React from 'react';
import { useProduct } from '../context/ProductContext';

function CompareButton({ productId }) {
  const { state, addToCompare, removeFromCompare } = useProduct();
  const isInCompareList = state.compareList.includes(productId);

  const handleCompareClick = () => {
    if (isInCompareList) {
      removeFromCompare(productId);
    } else {
      addToCompare(productId);
    }
  };

  return (
    <button
      onClick={handleCompareClick}
      className={`p-2 rounded-full ${
        isInCompareList ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
      aria-label={isInCompareList ? 'Remove from compare' : 'Add to compare'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default CompareButton;
