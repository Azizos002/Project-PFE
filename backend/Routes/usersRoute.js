const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const registerController = require('../Controllers/registerController');
router.post(
    '/register',
    [
        body('username').isString(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    registerController.singup);
module.exports = router;