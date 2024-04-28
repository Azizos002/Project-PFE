const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected route
router.get('/protectedRoute', authMiddleware, (req, res) => {
  try {
    // Access user ID from the request object
    const userId = req.userId;

    // Your protected route logic here
    res.send({ message: 'Protected route accessed successfully', userId });
  } catch (error) {
    // Handle any errors
    console.error('Error accessing protected route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
