const User = require('../models/User');
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
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Email not Found 404.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Wrong Password  .' });
            }

            // Generate JWT on successful login
            const payload = { userId: user._id };  
            const secret = process.env.JWT_SECRET;

            if (!secret) {
                throw new Error('JWT secret is not defined');
            }

            const token = jwt.sign(payload, secret, { expiresIn: '30m' });

            res.json({ message: 'Login successful!', token, username: user.username , email });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

module.exports = loginController;
