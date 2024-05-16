const User = require('../models/User');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
require("dotenv").config();

const forgotPasswordController = {
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                console.log('Email not found in the database');
                return res.status(404).json({ message: 'Email not found' });
            }
            const otp = generateNumericOTP(6);
            
            user.otp = otp;
            user.otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
            await user.save();
            console.log('OTP code generated:', otp);
            console.log('user',user.otp)

            await sendEmail(email, otp);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });
        const mailOptions = {
            from: {
                name: 'Reset-Password',
                address: process.env.EMAIL
            },
            to: email,
            subject: "Reset Password OTP",
            text: `Your OTP code is: ${otp}`,
            html: `<b>Your OTP code is: ${otp}</b>`,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email Sent...');

    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const generateNumericOTP = (length) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
};

module.exports = forgotPasswordController;
