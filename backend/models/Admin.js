const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
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
      }
}, {
    timestamps: true
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if password isn't modified
      }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next(); 
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;