// controllers/adminController.js

const User = require('../models/User');

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  searchUserByUsername: async (req, res) => {
    try {
      const { username } = req.query;
      const users = await User.find({ username: { $regex: username, $options: 'i' } });
      res.json(users);
    } catch (error) {
      console.error('Error searching user by username:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

module.exports = adminController;