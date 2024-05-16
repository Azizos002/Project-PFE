const mongoose = require('mongoose');

const TotalMonthlySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

// Create a compound index to ensure unique category per user
TotalMonthlySchema.index({ userId: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('TotalMonthly', TotalMonthlySchema);
