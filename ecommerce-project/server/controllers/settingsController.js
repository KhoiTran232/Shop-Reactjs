const Setting = require('../models/Settings');

exports.getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({
                storeName: 'My Store',
                storeEmail: 'store@example.com',
                storePhone: '',
                storeAddress: '',
                currency: 'USD',
                taxRate: 0,
                shippingFee: 0,
                freeShippingThreshold: 0
            });
        }
        res.json(settings);
    } catch (error) {
        console.error('Error in getSettings:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi tải cài đặt' });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const settings = await Setting.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.json(settings);
    } catch (error) {
        console.error('Error in updateSettings:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật cài đặt' });
    }
};
