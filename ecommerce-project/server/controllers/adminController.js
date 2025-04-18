const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');


const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        
        const orders = await Order.find({ isPaid: true });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSalesData = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const salesData = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: thirtyDaysAgo },
                    isPaid: true
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    date: "$_id",
                    total: 1,
                    _id: 0
                }
            }
        ]);

        res.json(salesData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopProducts = async (req, res) => {
    try {
        const topProducts = await Order.aggregate([
            { $match: { isPaid: true } },
            { $unwind: "$orderItems" },
            {
                $group: {
                    _id: "$orderItems.product",
                    unitsSold: { $sum: "$orderItems.qty" },
                    revenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.qty"] } }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            { $unwind: "$productInfo" },
            {
                $project: {
                    _id: 1,
                    name: "$productInfo.name",
                    image: "$productInfo.image",
                    unitsSold: 1,
                    revenue: 1
                }
            },
            { $sort: { revenue: -1 } },
            { $limit: 5 }
        ]);

        res.json(topProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hàm để lấy danh sách đơn hàng
const getOrders = async (req, res) => {
    try {
<<<<<<< HEAD
        const orders = await Order.find({})
            .populate('user', 'name email')
            .sort({ createdAt: -1 }); // Sort by newest first
        
        // Transform orders to handle null users
        const safeOrders = orders.map(order => ({
            ...order.toObject(),
            user: order.user || { name: 'Deleted User', email: 'N/A' }
        }));
        
        res.json(safeOrders);
=======
        const orders = await Order.find({}).populate('user', 'name email'); // Lấy tất cả đơn hàng và populate thông tin người dùng
        res.json(orders);
>>>>>>> e32f42725b23280fb5ec461d75b3a09c9d215fc9
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }
};

const getUsers = async (req, res) => {
    // logic lấy danh sách người dùng
    const users = await User.find();
    res.status(200).json(users);
};

module.exports = {
    getDashboardStats,
    getSalesData,
    getTopProducts,
    getOrders,
    getUsers
};