const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        // Log request data
        console.log('Creating order with data:', {
            body: req.body,
            user: req.user?._id
        });

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        // Validate user
        if (!req.user?._id) {
            return res.status(401).json({
                message: 'User not found or not authenticated'
            });
        }

        // Validate order items
        if (!orderItems?.length) {
            return res.status(400).json({
                message: 'Order items are required'
            });
        }

        // Validate shipping address
        if (!shippingAddress || !shippingAddress.address || 
            !shippingAddress.city || !shippingAddress.postalCode || 
            !shippingAddress.country) {
            return res.status(400).json({
                message: 'Shipping address is incomplete'
            });
        }

        // Validate payment method
        if (!['CASH', 'CARD'].includes(paymentMethod)) {
            return res.status(400).json({
                message: 'Invalid payment method'
            });
        }

        // Validate prices
        if (typeof itemsPrice !== 'number' || itemsPrice < 0) {
            return res.status(400).json({
                message: 'Invalid items price'
            });
        }

        if (typeof shippingPrice !== 'number' || shippingPrice < 0) {
            return res.status(400).json({
                message: 'Invalid shipping price'
            });
        }

        if (typeof totalPrice !== 'number' || totalPrice < 0) {
            return res.status(400).json({
                message: 'Invalid total price'
            });
        }

        // Create order with explicit type conversion
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map(item => ({
                name: String(item.name),
                quantity: Number(item.quantity),
                image: String(item.image || 'default-product-image.jpg'),
                price: Number(item.price),
                product: String(item.product)
            })),
            shippingAddress: {
                address: String(shippingAddress.address),
                city: String(shippingAddress.city),
                postalCode: String(shippingAddress.postalCode),
                country: String(shippingAddress.country)
            },
            paymentMethod: String(paymentMethod),
            itemsPrice: Number(itemsPrice),
            shippingPrice: Number(shippingPrice),
            totalPrice: Number(totalPrice),
            status: 'Pending'
        });

        // Log order before saving
        console.log('Order to save:', order);

        const createdOrder = await order.save();

        // Log created order
        console.log('Order created successfully:', createdOrder._id);

        return res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Order creation error:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });

        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID format',
                field: error.path
            });
        }

        // Handle other errors
        return res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name image');

        if (order) {
            // Check if the user is authorized to view this order
            if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                res.status(401);
                throw new Error('Bạn không có quyền xem đơn hàng này');
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập để xem đơn hàng' });
        }

        const orders = await Order.find({ user: req.user._id })
            .populate('orderItems.product', 'name image')
            .sort({ createdAt: -1 });

        return res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ 
            message: 'Đã xảy ra lỗi khi tải danh sách đơn hàng',
            error: error.message 
        });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getMyOrders,
    updateOrderToPaid
};
