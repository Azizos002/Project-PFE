const express = require('express');
const { body, validationResult } = require ('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post(
    '/register',
    [
        body('username').isString(),
        body('email').isEmail(),
        body('password').isLength({ min : 6 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json({ errors: err.message }));
    }
);
module.exports = router;
