const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

router.route('/')
    .post(protect, admin, createCoupon)
    .get(protect, admin, getCoupons);

router.route('/:id')
    .put(protect, admin, updateCoupon)
    .delete(protect, admin, deleteCoupon);

module.exports = router;
