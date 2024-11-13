const Painting = require('../models/Painting');

// Fetch all paintings
exports.getAllPaintings = async (req, res) => {
    try {
        const paintings = await Painting.find();
        res.json(paintings);
    } catch (error) {
        console.error("Error fetching paintings:", error);
        res.status(500).json({ message: 'Error fetching paintings' });
    }
};

// Update a painting by ID
exports.updatePainting = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedPainting = await Painting.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedPainting) {
            return res.status(404).json({ message: 'Painting not found' });
        }

        console.log('Painting updated:', updatedPainting);
        res.status(200).json({ message: 'Painting updated successfully!' });
    } catch (error) {
        console.error('Error updating painting:', error);
        res.status(500).json({ message: 'Error updating painting' });
    }
};
