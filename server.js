const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paintingRoutes = require('./routes/paintingRoutes'); // Import your routes

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use(express.static('public')); // Serve static files from the 'public' folder

// Routes
app.use('/api/paintings', paintingRoutes); // Use painting routes

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/paintings')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
