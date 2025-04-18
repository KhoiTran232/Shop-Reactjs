const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

const {
    getDashboardStats,
    getSalesData,
    getTopProducts,
    getOrders // Đảm bảo bạn đã import getOrders
} = require('../controllers/adminController');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/sales', protect, admin, getSalesData);
router.get('/top-products', protect, admin, getTopProducts);
router.get('/orders', protect, admin, getOrders); // Đường dẫn cho đơn hàng
router.get('/users', adminController.getUsers);

module.exports = router;