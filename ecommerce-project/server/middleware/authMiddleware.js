const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        console.log('Auth headers:', req.headers);
        
        let token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                message: 'Không tìm thấy token xác thực'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);

            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                return res.status(401).json({
                    message: 'Không tìm thấy người dùng'
                });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            message: 'Lỗi xác thực'
        });
    }
};

const admin = (req, res, next) => {
    console.log('Checking admin rights:', {
        user: req.user,
        isAdmin: req.user?.isAdmin
    });

    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            message: 'Không có quyền truy cập. Yêu cầu quyền admin.'
        });
    }
};

module.exports = { protect, admin };
