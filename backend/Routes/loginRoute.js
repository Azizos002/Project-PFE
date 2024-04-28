const express = require('express');

const router = express.Router();
const loginController = require('../Controllers/loginController');

router.post('/submit',loginController.login);

module.exports = router;