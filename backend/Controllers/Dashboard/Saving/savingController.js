// savingController.js
const Saving = require('../../../models/Dashboard/Saving');

// Controller function to create a new Saving entry
exports.createSaving = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const newSaving = await Saving.create({ userId, ...req.body  });
  
      res.status(201).json(newSaving);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get all Saving entries for a user
exports.getAllSaving = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const allSaving = await Saving.find({ userId }).select('description amount frequency');
      res.status(200).json(allSaving);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error)
    }
  };

// Controller function to update an existing Saving entry
exports.updateSaving = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const updatedSaving = await Saving.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      
      if (!updatedSaving) {
        return res.status(404).json({ message: 'Saving entry not found' });
      }
      
      res.status(200).json(updatedSaving);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to delete an existing Saving entry
exports.deleteSaving = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedSaving = await Saving.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedSaving) {
        return res.status(404).json({ message: 'Saving entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific Saving entry by ID
// exports.getSavingById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const saving = await Saving.findOne({ _id: req.params.id, userId });

//     if (!saving) {
//       return res.status(404).json({ message: 'Saving entry not found' });
//     }

//     res.status(200).json(saving);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };