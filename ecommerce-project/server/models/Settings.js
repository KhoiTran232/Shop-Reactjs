const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    storeName: {
        type: String,
        default: ''
    },
    storeEmail: {
        type: String,
        default: ''
    },
    storePhone: {
        type: String,
        default: ''
    },
    storeAddress: {
        type: String,
        default: ''
    },
    currency: {
        type: String,
        default: 'USD'
    },
    taxRate: {
        type: Number,
        default: 0
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    freeShippingThreshold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
