const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress
} = require('../controllers/addressController');

router.route('/')
    .post(protect, addAddress)
    .get(protect, getAddresses);
router.route('/:id')
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

module.exports = router;
