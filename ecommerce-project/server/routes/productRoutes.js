const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getProducts);

// Create product
router.post('/', 
    protect, 
    admin, 
    uploadMiddleware.single('image'), 
    productController.createProduct
);

// Get single product
router.get('/:id', productController.getProduct);

// Update product
router.put('/:id', 
    protect, 
    admin, 
    uploadMiddleware.single('image'), 
    productController.updateProduct
);

// Delete product
router.delete('/:id', 
    protect, 
    admin, 
    productController.deleteProduct
);

module.exports = router;
