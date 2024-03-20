const User = require('../models/User');
const bcrypt = require('bcryptjs');

const newPasswordController = {
    newPassword: async (req, res) => {
        try {
            const {email, confirmPassword} = req.body;
            const user = await User.findOne({ email });
            console.log('Email:', email);
            console.log('Password:', confirmPassword);
            if (!user) {
                console.log('User not found')
                return res.status(404).json({message: 'User not found'});
            } else {
                const hashedPass = await bcrypt.hash(confirmPassword, 10);
                user.password = hashedPass;
                await user.save();
                return res.status(200).json({message: 'The password has been changed and saved successfully!'});
            }
        }  catch (error) {
            console.error('Error setting new password:', error);
            return res.status(500).json({ message: 'Failed to set new password. Please try again later.' });
        }
    }
};

module.exports = newPasswordController;