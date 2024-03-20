const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "api",
        pass: "0dea75922822ea1c08e2c0f83c15e0b3",
    },
});

router.post('/submit', async (req, res) => {
    try {
        const { firstName, lastName, email, contactNumber, message } = req.body;
        console.log('Sending email...');
        const emailBody = `
        <h1>Notification</h1>
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
            subject: "notification",
            html: emailBody,
        });

        console.log("Message sent successfully...");

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;

// router.post('/submit',
//     async (req, res) => {
//         const { firstName, lastName, email, contactNumber, message } = req.body;

//         try {
//             const contactData = new Contact({ firstName, lastName, email, contactNumber, message });
//             await contactData.save();
//             res.status(200).json({ message: 'Contact form submitted successfully!' });
//         } catch (error) {
//             console.error('Error saving contact form data:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     });