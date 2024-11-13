const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/paintings', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const Painting = require('./models/Painting');

// API endpoint to fetch all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find();
        res.json(paintings);
    } catch (error) {
        console.error('Error fetching paintings:', error);
        res.status(500).json({ message: 'Error fetching paintings' });
    }
});

// Fallback route for serving the dummy image
app.get('/images/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, 'public', 'images', req.params.imageName);

    res.sendFile(imagePath, (err) => {
        if (err) {
            // If the requested image is not found, serve the dummy image
            res.sendFile(path.join(__dirname, 'public', 'images', 'dummyImage.jpg'));
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
