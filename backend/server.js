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
    .then(async () => {
        console.log("🚀 MongoDB Connected Successfully");
        
        // AUTO-SEEDER: If database is empty, fill it with your initial data
        const Video = require('./models/Video');
        const count = await Video.countDocuments();
        if (count === 0) {
            console.log("Empty database detected. Seeding initial videos...");
            // We will provide a simple array here to get you started
            // You can add your full list later
            const initialVideos = [
                { videoId: "cpoXLj24BDY", title: "JS Complete Course", category: "js", duration: "4:20:15" }
            ];
            await Video.insertMany(initialVideos);
            console.log("✅ Database Seeded!");
        }
    })
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is breathing on port ${PORT}`);
});