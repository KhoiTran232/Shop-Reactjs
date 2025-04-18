import React, { useState, useEffect } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';

function ProductFilter({ onFilter }) {
    const [filters, setFilters] = useState({
        priceRange: {
            min: '',
            max: ''
        },
        category: 'all',
        rating: 0,
        sortBy: 'newest'
    });

    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/products/categories');
            setCategories(['all', ...data]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('price')) {
            setFilters(prev => ({
                ...prev,
                priceRange: {
                    ...prev.priceRange,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleRatingClick = (rating) => {
        setFilters(prev => ({
            ...prev,
            rating
        }));
    };

    const handleApplyFilter = () => {
        onFilter(filters);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        const defaultFilters = {
            priceRange: { min: '', max: '' },
            category: 'all',
            rating: 0,
            sortBy: 'newest'
        };
        setFilters(defaultFilters);
        onFilter(defaultFilters);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"
            >
                <FaFilter className="mr-2" />
                Filter Products
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-72 bg-white rounded-md shadow-lg p-4">
                    {/* Price Range */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Price Range</h3>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                name="price.min"
                                value={filters.priceRange.min}
                                onChange={handleChange}
                                placeholder="Min"
                                className="w-1/2 px-2 py-1 border rounded-md"
                            />
                            <input
                                type="number"
                                name="price.max"
                                value={filters.priceRange.max}
                                onChange={handleChange}
                                placeholder="Max"
                                className="w-1/2 px-2 py-1 border rounded-md"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Category</h3>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded-md"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Rating</h3>
                        <div className="flex space-x-1">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleRatingClick(rating)}
                                    className={`flex items-center px-2 py-1 rounded-md ${
                                        filters.rating === rating
                                            ? 'bg-yellow-100 border-yellow-400'
                                            : 'bg-gray-100'
                                    }`}
                                >
                                    <FaStar className="text-yellow-400 mr-1" />
                                    {rating}+
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort By */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Sort By</h3>
                        <select
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded-md"
                        >
                            <option value="newest">Newest</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={handleApplyFilter}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Apply
                        </button>
                        <button
                            onClick={handleClearFilter}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductFilter;
