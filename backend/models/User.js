const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Only 'admin' can post
    bookmarks: [{ type: String }], // Array of videoIds
    history: [{ 
        videoId: String, 
        watchedAt: { type: Date, default: Date.now } 
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);