// personalController.js
const Personal = require('../../../models/Dashboard/Personal');

// Controller function to create a new personal entry
exports.createPersonal = async (req, res) => {
    try {
        const userId = req.user.id;

        const newPersonal = await Personal.create({ userId, ...req.body });

        res.status(201).json(newPersonal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all personal entries for a user
exports.getAllPersonal = async (req, res) => {
    try {
        const userId = req.user.id;

        const allPersonal = await Personal.find({ userId }).select('description amount frequency');
        res.status(200).json(allPersonal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update an existing Personal entry
exports.updatePersonal = async (req, res) => {
    try {
        const userId = req.user.id;

        const updatedPersonal = await Personal.findOneAndUpdate(
            { _id: req.params.id, userId },
            req.body,
            { new: true }
        );

        if (!updatedPersonal) {
            return res.status(404).json({ message: 'Personal entry not found' });
        }

        res.status(200).json(updatedPersonal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete an existing Personal entry
exports.deletePersonal = async (req, res) => {
    try {
        const userId = req.user.id;

        const deletedPersonal = await Personal.findOneAndDelete({ _id: req.params.id, userId });

        if (!deletedPersonal) {
            return res.status(404).json({ message: 'Personal entry not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a specific Personal entry by ID
// exports.getIncomeById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const personal = await Personal.findOne({ _id: req.params.id, userId });

//     if (!personal) {
//       return res.status(404).json({ message: 'Personal entry not found' });
//     }

//     res.status(200).json(personal);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };