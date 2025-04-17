const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendOrderConfirmationEmail = async (order) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: order.user.email,
        subject: `Xác nhận đơn hàng #${order._id}`,
        html: `
            <h1>Cảm ơn bạn đã đặt hàng!</h1>
            <p>Đơn hàng của bạn đã được xác nhận.</p>
            <h2>Chi tiết đơn hàng:</h2>
            <ul>
                ${order.orderItems.map(item => `
                    <li>${item.name} - Số lượng: ${item.qty} - Giá: $${item.price}</li>
                `).join('')}
            </ul>
            <p>Tổng tiền: $${order.totalPrice}</p>
            <h2>Địa chỉ giao hàng:</h2>
            <p>
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}<br>
                ${order.shippingAddress.postalCode}<br>
                ${order.shippingAddress.country}
            </p>
            <p>Bạn có thể theo dõi đơn hàng tại: <a href="${process.env.FRONTEND_URL}/order/${order._id}">đây</a></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendOrderStatusUpdateEmail = async (order, status) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: order.user.email,
        subject: `Cập nhật trạng thái đơn hàng #${order._id}`,
        html: `
            <h1>Đơn hàng của bạn đã được cập nhật</h1>
            <p>Trạng thái mới: ${status === 'paid' ? 'Đã thanh toán' : 'Đã giao hàng'}</p>
            <p>Bạn có thể xem chi tiết đơn hàng tại: <a href="${process.env.FRONTEND_URL}/order/${order._id}">đây</a></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendResetPasswordEmail = async (email, resetToken) => {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendOrderConfirmationEmail,
    sendOrderStatusUpdateEmail,
    sendResetPasswordEmail
};
