const Admin = require('../models/Admin'); // Adjust the path as necessary

const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Create a new admin
        admin = new Admin({
            username,
            email,
            password
        });

        // Save the admin to the database
        await admin.save();

        // Response to client
        res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = registerAdmin;
