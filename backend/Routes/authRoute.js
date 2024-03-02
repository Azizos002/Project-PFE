const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email, password });

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Go to register; you don\'t have an account here!' });
        }

        // Compare the password provided by the user with the password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            console.log('Logged In Successfully');
            return res.status(200).json({ message: 'Login Success' });
        } else {
            console.log('Password incorrect');
            return res.status(401).json({ message: 'Check your password again; it\'s wrong xD' });
        }
    } catch (error) {
        console.error('Error during Login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
