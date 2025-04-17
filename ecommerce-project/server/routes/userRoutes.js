const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
    registerUser, 
    loginUser, 
    getUserProfile,
    getUsers,
    deleteUser,
    updateUser
} = require('../controllers/userController');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);

// Admin routes
router.get('/admin/users', protect, admin, getUsers);
router.delete('/admin/users/:id', protect, admin, deleteUser);
router.put('/admin/users/:id', protect, admin, updateUser);

module.exports = router;
