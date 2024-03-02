// Example User model structure
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.index({ email: 1 }, { unique: true, background: true });


const User = mongoose.model('User', userSchema);

module.exports = User;