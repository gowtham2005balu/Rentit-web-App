const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /pg-properties
router.get('/', async (req, res) => {
    try {
        const pgs = await Property.find({ type: 'PG' });
        res.status(200).json(pgs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
