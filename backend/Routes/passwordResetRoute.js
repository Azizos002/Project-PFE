const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../models/User');

const router = express.Router();
const emailUser = process.env.EMAIL_USR;
const passwordUser = process.env.PASS_USR;
//create a nodemailer transport 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: passwordUser,
    },
});

// route for forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        //generate a unique token
        const token = crypto.randomBytes(20).toString('hex');

        //find the user by his email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found..' });
        }

        //Save the token and expiration time in the user's record
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        //save user with the updates
        await user.save();

        //Send an email with the reset link to the USER
        const mailOptions = {
            from: 'pfe.projet2024@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested a password reset for your account.\n\nPlease click on the following link to reset your password: http://localhost:5000/reset-password?token=${token}\n\nIf you did not request a password reset, please ignore this email and your password will remain unchanged.\n\nThis link will expire in 1 hour. If you have trouble clicking the link, please copy and paste the URL into your web browser.\n\nRegards,\nThe Smart-Money Team`,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending Email : ', error);
                return res.status(500).json({ message: 'Error sending email : ', error });
            }
            console.log('Email  sent : ', info.response);
            return res.status(200).json({ message: 'Password reset initiated. Check your email for instructions <3 .' });
        });
    } catch (error) {
        console.error('Error during forgot password ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;