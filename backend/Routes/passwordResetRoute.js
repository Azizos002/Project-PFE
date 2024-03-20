const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../Controllers/forgotPasswordController');
const verifyOTPController = require('../Controllers/verifyOTPController');
const newPasswordController = require('../Controllers/newPasswordController');

router.post('/forgot-password', forgotPasswordController.forgotPassword);

router.post('/verify-otp', verifyOTPController.verifyOTP);

router.post('/newPassword', newPasswordController.newPassword);

module.exports = router;