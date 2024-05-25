// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'superUser'],
    default: 'user',
  }
}, {
  timestamps: true
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing if password isn't modified
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
  next(); 
});

const User = mongoose.model('User', userSchema);

module.exports = User;