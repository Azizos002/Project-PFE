const bcrypt = require('bcryptjs');
const User = require('../models/User');

const verifyOTPController = {
    verifyOTP: async (req, res) => {
        try {
                const { email, otp } = req.body;
                console.log(otp)
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.otpExpiration < new Date()) {
                return res.status(400).json({ message: 'OTP has expired' });
            }

            if (otp === user.otp) {
                console.log("Be3 w rawa7 XD");
                return res.status(200).json({ message: 'Reset Password succeesss' })
            }

            if (otp !== user.otp) {
                console.log('herereee',user.otp)
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            // const hashedOTP = await bcrypt.hash(otp, 10);

            // if (isValid) {
            //     existingUser.otpSecret = undefined;
            //     await existingUser.save();
            //     res.status(200).json({ message: 'OTP verified successfully' });
            // } else {
            //     res.status(400).json({ message: 'Invalid OTP code' });
            // }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = verifyOTPController;