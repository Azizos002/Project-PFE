const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/submit',
    async (req, res) => {
        const { firstName, lastName, email, contactNumber, message } = req.body;

        try {
            const contactData = new Contact({ firstName, lastName, email, contactNumber, message });
            await contactData.save();
            res.status(200).json({ message: 'Contact form submitted successfully!' });
        } catch (error) {
            console.error('Error saving contact form data:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

module.exports = router;
