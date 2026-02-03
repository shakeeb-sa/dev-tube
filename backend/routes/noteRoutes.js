const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/notes/:videoId
// @desc    Get the user's note for a specific video
router.get('/:videoId', protect, async (req, res) => {
    try {
        const note = await Note.findOne({ userId: req.user._id, videoId: req.params.videoId });
        res.json(note || { content: '' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/notes
// @desc    Create or Update a note
router.post('/', protect, async (req, res) => {
    const { videoId, content } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { userId: req.user._id, videoId },
            { content },
            { upsert: true, new: true }
        );
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;