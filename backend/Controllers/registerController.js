const express = require('express');
const User = require('../models/User');

const router = express.Router();

const registerController = {
    singup: async (req, res) => {
        const { username, email, password } = req.body;

        // Validate user input
        if (!username || !email || !password) {
            res.status(400)
            throw new Error('Please provide all required fields.')
        }

        try {

            // Check for existing user with same email or username
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                res.status(400)
                throw new Error('Username or email already exists.')
            }

            // Create a new user
            const newUser = new User({ username, email, password });
            await newUser.save();

            res.status(200).json({
                _id: User.id,
                name: User.username,
                email: User.email
            });
            console.log('registrationn done');

        } catch (err) {
            console.error('Error during registration:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = registerController;