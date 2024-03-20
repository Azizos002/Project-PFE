const express = require('express');
const { body, validationResult } = require ('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post(
    '/register',
    [
        body('username').isString(),
        body('email').isEmail(),
        body('password').isLength({ min : 6 }),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ ...req.body, password: hashedPassword });
            res.json(user);
            console.log('Registration done...');
        } catch (err) {
            console.error('Error during registration:', err);
            res.status(500).json({ errors: 'Internal server error' });
        }
    }
);
module.exports = router;