const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for seeding...'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            isAdmin: true
        });

        console.log('Admin user created');

        const sampleProducts = [
            {
                name: 'iPhone 15 Pro',
                description: 'Latest iPhone with pro camera system',
                price: 999.99,
                image: 'https://images.unsplash.com/photo-1695048132832-b41495f12eb4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500',
                brand: 'Apple',
                category: 'electronics',
                countInStock: 10,
                rating: 4.5,
                numReviews: 12,
                user: adminUser._id
            },
            {
                name: 'Nike Air Max',
                description: 'Comfortable running shoes',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
                brand: 'Nike',
                category: 'clothing',
                countInStock: 20,
                rating: 4.0,
                numReviews: 8,
                user: adminUser._id
            },
            {
                name: 'The Alchemist',
                description: 'International bestseller book',
                price: 14.99,
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
                brand: 'Harper Collins',
                category: 'books',
                countInStock: 50,
                rating: 4.8,
                numReviews: 25,
                user: adminUser._id
            },
            {
                name: 'Samsung Galaxy S21',
                description: 'Flagship Android smartphone',
                price: 899.99,
                image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
                brand: 'Samsung',
                category: 'electronics',
                countInStock: 15,
                rating: 4.6,
                numReviews: 18,
                user: adminUser._id
            },
            {
                name: 'Adidas Ultraboost',
                description: 'Premium running shoes',
                price: 179.99,
                image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
                brand: 'Adidas',
                category: 'clothing',
                countInStock: 25,
                rating: 4.7,
                numReviews: 15,
                user: adminUser._id
            }
        ];

        const createdProducts = await Product.insertMany(sampleProducts);
        console.log('Products seeded successfully');
        console.log(`Created ${createdProducts.length} products`);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
