const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: 'artworks' }); // Explicitly set the collection name

module.exports = mongoose.model('Painting', paintingSchema);
