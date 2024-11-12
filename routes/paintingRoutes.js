const express = require('express');
const router = express.Router();
const { getAllPaintings, updatePainting } = require('../controllers/paintingController'); // Import your controllers

// Route to get all paintings
router.get('/', getAllPaintings);

// Route to update a painting by ID
router.put('/:id', updatePainting);

module.exports = router; // Export the router
