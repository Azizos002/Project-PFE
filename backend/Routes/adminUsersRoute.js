// routes/admin.js

const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// GET all users
router.get('/users', adminController.getAllUsers);

// DELETE user by ID
router.delete('/users/:userId', adminController.deleteUser);

// PUT update user by ID
router.put('/users/:userId', adminController.updateUser);

// GET user by username
router.get('/users/search', adminController.searchUserByUsername);

module.exports = router;