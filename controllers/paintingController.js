const Painting = require('../models/Painting');

exports.getAllPaintings = async (req, res) => {
    console.log("Fetching paintings...");
    try {
        const paintings = await Painting.find();
        console.log("Paintings fetched:", paintings);
        res.json(paintings);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error fetching paintings' });
    }
};


// Update a painting by ID
exports.updatePainting = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPainting = await Painting.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedPainting);
    } catch (error) {
        res.status(500).json({ message: 'Error updating painting' });
    }
};
