const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    type: { type: String, enum: ['Residential', 'Commercial', 'Flatmate', 'PG'] },
    location: {
        address: String,
        lat: Number,
        lng: Number
    },
    images: [String], // Array of image URLs
    amenities: [String],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
