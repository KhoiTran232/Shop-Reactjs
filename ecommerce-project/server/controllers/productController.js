const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching products', 
            error: error.message 
        });
    }
};

// Get single product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching product', 
            error: error.message 
        });
    }
};

// Create product
const createProduct = async (req, res) => {
    try {
        // Log toàn bộ thông tin request
        console.log('Request headers:', req.headers);
        console.log('Request user:', req.user);
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        if (!req.user) {
            return res.status(401).json({
                message: 'Authentication required',
                error: 'No user found in request'
            });
        }

        const { name, price, description, category, brand, stock } = req.body;
        
        const productData = {
            name,
            price: parseFloat(price),
            description,
            category,
            brand,
            stock: parseInt(stock),
            inStock: parseInt(stock) > 0,
            user: req.user._id,  // Thêm user ID từ request
            image: req.file ? req.file.path.replace(/\\/g, '/') : 'default-product-image.jpg' // Thêm đường dẫn mặc định nếu không có ảnh
        };

        console.log('Product data to save:', productData);

        const product = new Product(productData);
        await product.save();

        console.log('Product saved successfully:', product);

        res.status(201).json(product);
    } catch (error) {
        console.error('Error in createProduct:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Trả về lỗi chi tiết hơn
        res.status(500).json({ 
            message: 'Error creating product', 
            error: error.message,
            details: error.errors ? Object.keys(error.errors).map(key => ({
                field: key,
                message: error.errors[key].message
            })) : null
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, brand, stock } = req.body;
        
        const updateData = {
            name,
            price: parseFloat(price),
            description,
            category,
            brand,
            stock: parseInt(stock),
            inStock: parseInt(stock) > 0
        };

        if (req.file) {
            updateData.image = req.file.path.replace(/\\/g, '/');
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        Object.assign(product, updateData);
        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating product', 
            error: error.message 
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting product', 
            error: error.message 
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
