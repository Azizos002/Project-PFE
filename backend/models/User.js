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
},{
  timestamps: true
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing if password isn't modified
  }

  const saltRounds = await bcrypt.genSalt(10);
  console.log('test salt generated : ',saltRounds)
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
  next(); 
});

const User = mongoose.model('User', userSchema);

module.exports = User;