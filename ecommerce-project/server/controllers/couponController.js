const Coupon = require('../models/Coupon');

// Định nghĩa các hàm
const createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({});
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!coupon) {
            return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
        }
        res.json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
        }
        res.json({ message: 'Đã xóa mã giảm giá' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export tất cả các hàm
module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
};
