require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- 1. PRO-DATABASE CONNECTION (Vercel Stable Pattern) ---
const MONGO_URI = process.env.MONGO_URI;

// Single connection instance
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(MONGO_URI);
        isConnected = db.connections[0].readyState;
        console.log("🚀 MongoDB Connected successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
    }
};

// Middleware to ensure DB is connected before any request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// --- 2. Test Route ---
app.get('/', (req, res) => {
    res.send(`DevTube API is Online. DB Connected: ${isConnected ? 'Yes' : 'No'}`);
});

// --- DEBUG LOGGER ---
app.use((req, res, next) => {
    console.log(`📡 Request Received: ${req.method} ${req.url}`);
    next();
});

// --- 3. Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// Global Error Handler (This will help you see EXACT errors in Vercel logs)
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// --- 4. Export for Vercel ---
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local Server Running on ${PORT}`));
}

module.exports = app;