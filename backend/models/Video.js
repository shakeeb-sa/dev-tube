const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true }, // The YouTube ID
    title: { type: String, required: true },
    thumbnail: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String, default: 'beginner' },
    views: { type: String, default: '0' },
    duration: { type: String },
    description: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);