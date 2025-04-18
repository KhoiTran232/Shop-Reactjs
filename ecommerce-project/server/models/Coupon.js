const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Vui lòng nhập mã giảm giá'],
        unique: true,
        uppercase: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Vui lòng nhập mô tả']
    },
    discount: {
        type: Number,
        required: [true, 'Vui lòng nhập số tiền giảm giá'],
        min: [0, 'Giảm giá không thể nhỏ hơn 0'],
        max: [100, 'Giảm giá không thể lớn hơn 100%']
    },
    startDate: {
        type: Date,
        required: [true, 'Vui lòng nhập ngày bắt đầu'],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, 'Vui lòng nhập ngày kết thúc']
    },
    minPurchase: {
        type: Number,
        default: 0
    },
    maxUses: {
        type: Number,
        required: [true, 'Vui lòng nhập số lần sử dụng tối đa']
    },
    usedCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);
