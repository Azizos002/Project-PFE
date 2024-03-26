const express = require('express')
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
        user: "api",
        pass: "0dea75922822ea1c08e2c0f83c15e0b3",
    },
});

const contactController = {
    contact: async (req, res) => {
        try {
            const { firstName, lastName, email, contactNumber, message } = req.body;
            console.log('Sending email...');

            const user = await User.findOne({ email });
            if (!user) {
                console.log('Email not found in the database');
                return res.status(404).json({ message: 'Email not found' });
            }

            const emailBody = `
            <h1>Get in touch</h1>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contactNumber}</p>
            <p><strong>Message:</strong> ${message}</p>
            `;
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: "contact@demomailtrap.com",
                to: "pfe.projet2024@gmail.com",
                subject: "Contact",
                html: emailBody,
            });
    
            console.log("Message sent successfully...");
    
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};



module.exports = contactController;