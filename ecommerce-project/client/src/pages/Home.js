import React from 'react';
import { Link } from 'react-router-dom';

// Data cho Featured Categories
const categories = [
    {
        name: 'Electronics',
        slug: 'electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000',
        description: 'Latest gadgets and electronics'
    },
    {
        name: 'Fashion',
        slug: 'fashion',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000',
        description: 'Trendy clothing and accessories'
    },
    {
        name: 'Home & Living',
        slug: 'home-living',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1000',
        description: 'Home decor and furniture'
    }
];

// Data cho Featured Products
const featuredProducts = [
    {
        _id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
        description: 'High-quality wireless headphones'
    },
    {
        _id: '2',
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
        description: 'Modern smartwatch with fitness tracking'
    },
    {
        _id: '3',
        name: 'Camera Lens',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1542567455-cd733f23fbb1?q=80&w=1000',
        description: 'Professional camera lens'
    },
    {
        _id: '4',
        name: 'Laptop',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000',
        description: 'Powerful laptop for work and gaming'
    }
];

function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div 
                className="relative h-[500px] bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000')`
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Chào mừng đến với E-Shop
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        Khám phá sản phẩm tuyệt vời với giá cả hợp lý
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg 
                                 hover:bg-blue-700 transition duration-300 w-fit"
                    >
                        Mua ngay
                    </Link>
                </div>
            </div>

            {/* Featured Categories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        Danh mục đặc biệt
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <div 
                                key={category.name} 
                                className="relative overflow-hidden rounded-lg shadow-lg group h-[300px]"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition duration-300 
                                             group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-200 mb-4">
                                            {category.description}
                                        </p>
                                        <Link
                                            to={`/category/${category.slug}`}
                                            className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                                        >
                                            Browse {category.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        Sản phẩm đặc biệt
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <div 
                                key={product._id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden 
                                         hover:shadow-xl transition duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition duration-300 
                                                 hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {product.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold">
                                            ${product.price}
                                        </span>
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded
                                                     hover:bg-blue-700 transition duration-300"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Offers Banner */}
            <section className="py-16 bg-gray-50">
                <div 
                    className="container mx-auto px-4 relative h-[200px] rounded-xl overflow-hidden bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1000')`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center px-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ưu đãi đặc biệt
                        </h2>
                        <p className="text-white/90 mb-6">
                            Nhận đến 50% giảm giá trên các sản phẩm được chọn
                        </p>
                        <Link
                            to="/offers"
                            className="bg-white text-blue-600 px-6 py-2 rounded-lg 
                                     hover:bg-gray-100 transition duration-300 w-fit"
                        >
                            Xem ưu đãi
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
