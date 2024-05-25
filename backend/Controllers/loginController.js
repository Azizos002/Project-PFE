const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log('Received login request:', { email, password });

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        try {
            // Check if the user is an admin
            let user = await Admin.findOne({ email });
            let role = 'admin';

            // If not found in admin, check if the user is a normal user
            if (!user) {
                user = await User.findOne({ email });
                role = 'user';
            }

            // If user is not found in either, return an error
            if (!user) {
                return res.status(402).json({ message: 'Email not found.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(402).json({ message: 'Wrong Password.' });
            }

            // Generate JWT on successful login
            const payload = { userId: user._id, role: role };
            const secret = process.env.JWT_SECRET;

            if (!secret) {
                throw new Error('JWT secret is not defined');
            }

            const token = jwt.sign(payload, secret, { expiresIn: '24h' });
            console.log(token)

            res.json({ message: 'Login successful!', token, username: user.username, email, role });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

module.exports = loginController;