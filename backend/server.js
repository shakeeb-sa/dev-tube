require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- 1. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- 2. Test Route ---
app.get('/', (req, res) => {
    res.send("DevTube API is Running...");
});

// --- DEBUG LOGGER ---
app.use((req, res, next) => {
    console.log(`📡 Request Received: ${req.method} ${req.url}`);
    next();
});

// --- 3. Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/notes', require('./routes/noteRoutes')); // ADDED

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}
module.exports = app; // CRITICAL for Vercel