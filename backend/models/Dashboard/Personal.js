const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: ['monthly', 'weekly', 'bi-weekly', 'trimester', 'semester', 'annual'],
        default: 'monthly'
    }
});

const Personal = mongoose.model('Personal', personalSchema);

module.exports = Personal;