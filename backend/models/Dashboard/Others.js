const mongoose = require('mongoose');

const othersSchema = new mongoose.Schema({
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

const Others = mongoose.model('Others', othersSchema);

module.exports = Others;