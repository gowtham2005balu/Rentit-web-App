const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// POST /preferences
// Used by your app to filter properties based on user preferences
router.post('/', async (req, res) => {
    try {
        const { minPrice, maxPrice, type, location } = req.body;
        
        let query = {};
        if (type) query.type = type;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }
        
        const results = await Property.find(query);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
