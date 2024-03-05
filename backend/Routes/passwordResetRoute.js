// passwordResetRoute.js
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const User = require('../models/User');

const router = express.Router();
const emailUser = process.env.EMAIL_USR;
const passwordUser = process.env.PASS_USR;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: passwordUser,
    },
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Step 1: Generating a unique OTP...');
        const otp = randomstring.generate({ length: 6, charset: 'numeric' });
        console.log('OTP generated:', otp);

        console.log('Step 2: Finding the user by email...');
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found.');
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log('Step 3: Updating user record with the OTP and expiration time...');
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 600000; // OTP expires in 10 minutes

        await user.save();
        console.log('User record updated with OTP and expiration time.');

        console.log('Step 4: Sending an email with the OTP...');
        const mailOptions = {
            from: 'pfe.projet2024@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email:', error });
            }
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'OTP sent. Check your email for instructions <3.' });
        });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;