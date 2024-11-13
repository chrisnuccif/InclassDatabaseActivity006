const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    Title: String,
    LastName: String,
    YearOfWork: Number,
    Description: String,
    ImageFileName: String
}, { collection: 'artworks' });

module.exports = mongoose.model('Painting', paintingSchema);
