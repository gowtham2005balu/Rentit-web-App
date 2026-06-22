const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find({ type: 'Residential' });
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /properties (Create new property)
router.post('/', async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
