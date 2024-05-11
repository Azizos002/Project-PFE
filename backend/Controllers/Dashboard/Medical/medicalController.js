const Medical = require('../../../models/Dashboard/Medical')

// Controller function to create a new Medical entry
exports.createMedical = async (req, res) => {
    try {
        const userId = req.user.id;

        const newMedical = await Medical.create({ userId, ...req.body });

        res.status(201).json(newMedical);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all medical entries for a user
exports.getAllMedical = async (req, res) => {
    try {
        const userId = req.user.id;

        const allMedical = await Medical.find({ userId }).select('description amount frequency');
        res.status(200).json(allMedical);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update an existing income entry
exports.updateMedical = async (req, res) => {
    try {
        const userId = req.user.id;

        const updatedMedical = await Medical.findOneAndUpdate(
            { _id: req.params.id, userId },
            req.body,
            { new: true }
        );

        if (!updatedMedical) {
            return res.status(404).json({ message: 'Medical entry not found' });
        }

        res.status(200).json(updatedMedical);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete an existing income entry
exports.deleteMedical = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedMedical = await Medical.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedMedical) {
        return res.status(404).json({ message: 'Medical entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific medical entry by ID
// exports.getMedicalById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const medical = await Medical.findOne({ _id: req.params.id, userId });

//     if (!medical) {
//       return res.status(404).json({ message: 'Medical entry not found' });
//     }

//     res.status(200).json(medical);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };