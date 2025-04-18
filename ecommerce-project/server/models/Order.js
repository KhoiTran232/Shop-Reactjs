const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['CASH', 'CARD'],
        default: 'CASH'
    },
    paymentResult: {
        status: { type: String },
        update_time: { type: String },
        card_type: { type: String },
        last4: { type: String }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

// Tính toán tổng giá trị đơn hàng trước khi lưu
orderSchema.pre('save', function(next) {
    // Tính itemsPrice
    this.itemsPrice = this.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    // Tính shippingPrice (miễn phí ship cho đơn > $100)
    this.shippingPrice = this.itemsPrice > 100 ? 0 : 10;

    // Tính totalPrice
    this.totalPrice = this.itemsPrice + this.shippingPrice;

    next();
});

module.exports = mongoose.model('Order', orderSchema);
