const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/paintings', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Mongoose Model
const Painting = require('./models/Painting');

// API endpoint to fetch all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find();
        res.json(paintings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching paintings' });
    }
});

// API endpoint to update a painting
app.put('/api/paintings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPainting = await Painting.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.json({ message: "Painting updated successfully!", painting: updatedPainting });
    } catch (error) {
        res.status(500).json({ message: 'Error updating painting' });
    }
});

// Route to handle image requests
app.get('/images/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, 'images', req.params.imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, 'images', 'dummyImage.jpg'));
        }
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
