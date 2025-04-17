import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - sau này sẽ được thay thế bằng dữ liệu thật từ API
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      category: 'electronics',
      image: 'https://via.placeholder.com/150'
    },
    // Thêm nhiều sản phẩm khác...
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {['All', 'Electronics', 'Fashion', 'Home & Living'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <input
                type="range"
                className="w-full"
                min="0"
                max="1000"
                step="10"
              />
              <div className="flex justify-between mt-2">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <Link to={`/product/${product.id}`} className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </Link>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
