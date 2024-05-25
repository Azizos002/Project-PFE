const express = require('express');
const router = express.Router();
const registerAdmin = require('../Controllers/registerAdmin'); 

router.post('/register', registerAdmin);

module.exports = router;