const ShippingRate = require('../models/shippingRateModel');
const Order = require('../models/orderModel');

// @desc    Calculate shipping cost
// @route   POST /api/shipping/calculate
// @access  Private
const calculateShipping = async (req, res) => {
    try {
        const { region, weight, totalAmount } = req.body;

        const shippingRate = await ShippingRate.findOne({ 
            region: region,
            isActive: true 
        });

        if (!shippingRate) {
            return res.status(404).json({ 
                message: 'Shipping rate not found for this region' 
            });
        }

        // Tính phí vận chuyển cơ bản
        let shippingCost = shippingRate.baseRate;

        // Thêm phí theo cân nặng
        if (weight > 0) {
            shippingCost += weight * shippingRate.ratePerKg;
        }

        // Miễn phí vận chuyển cho đơn hàng trên 1000$
        if (totalAmount >= 1000) {
            shippingCost = 0;
        }

        res.json({
            cost: shippingCost,
            estimatedDays: shippingRate.estimatedDays
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all shipping rates
// @route   GET /api/shipping/rates
// @access  Private/Admin
const getShippingRates = async (req, res) => {
    try {
        const rates = await ShippingRate.find({});
        res.json(rates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create shipping rate
// @route   POST /api/shipping/rates
// @access  Private/Admin
const createShippingRate = async (req, res) => {
    try {
        const rate = new ShippingRate(req.body);
        const createdRate = await rate.save();
        res.status(201).json(createdRate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    calculateShipping,
    getShippingRates,
    createShippingRate
};
