const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /commercial
router.get('/', async (req, res) => {
    try {
        const commercials = await Property.find({ type: 'Commercial' });
        res.status(200).json(commercials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /commercial/:id
router.get('/:id', async (req, res) => {
    try {
        const commercial = await Property.findById(req.params.id);
        res.status(200).json(commercial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
