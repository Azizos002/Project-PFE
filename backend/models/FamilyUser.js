const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    otp: String,
    otpExpiration: Date,
})

familySchema.index({id : 1}, {unique: true, background: true});

const  Family = mongoose.model('Family', familySchema);

module.exports = Family;