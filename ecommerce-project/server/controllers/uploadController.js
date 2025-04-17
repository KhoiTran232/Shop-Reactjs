const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ecommerce'
        });

        // Delete file from server
        fs.unlinkSync(req.file.path);

        res.json({
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete image
// @route   DELETE /api/upload/:publicId
// @access  Private/Admin
const deleteImage = async (req, res) => {
    try {
        const { publicId } = req.params;
        await cloudinary.uploader.destroy(publicId);
        res.json({ message: 'Image deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadImage,
    deleteImage
};
