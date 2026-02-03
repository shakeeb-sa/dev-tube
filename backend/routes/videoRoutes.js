const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { protect, adminOnly } = require('../middleware/authMiddleware');
// TEMP ROUTE: Data Migration (Run once then delete)
router.post('/migrate', async (req, res) => {
    try {
        await Video.insertMany(req.body);
        res.json({ message: "Successfully moved all videos to MongoDB!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/videos
// @desc    Get all videos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/videos
// @desc    Add a new video
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
    const { videoId, title, thumbnail, category, subCategory, views, duration, description } = req.body;

    try {
        const videoExists = await Video.findOne({ videoId });
        if (videoExists) return res.status(400).json({ message: "Video already exists" });

        const video = new Video({
            videoId, title, thumbnail, category, subCategory, views, duration, description,
            addedBy: req.user._id
        });

        const createdVideo = await video.save();
        res.status(201).json(createdVideo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   DELETE /api/videos/:id
// @desc    Delete a video
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (video) {
            await video.deleteOne();
            res.json({ message: 'Video removed' });
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;