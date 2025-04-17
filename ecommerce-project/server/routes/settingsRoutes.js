const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getSettings, updateSettings } = require('../controllers/settingsController');

router.route('/')
    .get(protect, admin, getSettings)
    .put(protect, admin, updateSettings);

module.exports = router;
