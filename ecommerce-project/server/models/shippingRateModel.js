const mongoose = require('mongoose');

const shippingRateSchema = mongoose.Schema({
    region: {
        type: String,
        required: true
    },
    baseRate: {
        type: Number,
        required: true
    },
    ratePerKg: {
        type: Number,
        required: true
    },
    estimatedDays: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const ShippingRate = mongoose.model('ShippingRate', shippingRateSchema);
module.exports = ShippingRate;
