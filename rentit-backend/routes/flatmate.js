const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /flatmate/all
router.get('/all', async (req, res) => {
    try {
        const flatmates = await Property.find({ type: 'Flatmate' });
        res.status(200).json(flatmates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /flatmate/:id
router.get('/:id', async (req, res) => {
    try {
        const flatmate = await Property.findById(req.params.id);
        res.status(200).json(flatmate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
