const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { type: String, required: true }, // The YouTube Video ID
    content: { type: String, default: '' }
}, { timestamps: true });

// Ensure a user can only have ONE note per video
noteSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model('Note', noteSchema);