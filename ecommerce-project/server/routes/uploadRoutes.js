const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadImage, deleteImage } = require('../controllers/uploadController');

router.post('/', protect, upload.single('image'), uploadImage);
router.delete('/:publicId', protect, admin, deleteImage);

module.exports = router;
