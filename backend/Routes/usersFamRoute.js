const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

const userController = require('../Controllers/registerFamController');

router.post(
    '/registerFam',
    [
        body('id').isString(),
        body('username').isString(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    userController.registerFam);

module.exports = router;