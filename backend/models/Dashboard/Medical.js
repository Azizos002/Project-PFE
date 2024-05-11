const mongoose = require('mongoose');

const mediacalSchema = new mongoose.Schema({
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

const Medical = mongoose.model('Medical', mediacalSchema);

module.exports = Medical;