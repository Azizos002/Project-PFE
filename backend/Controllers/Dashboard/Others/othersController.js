// othersController.js
const Others = require('../../../models/Dashboard/Others');

// Controller function to create a new others entry
exports.createOthers = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const newOthers = await Others.create({ userId, ...req.body  });
  
      res.status(201).json(newOthers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get all Others entries for a user
exports.getAllOthers = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const allOthers = await Others.find({ userId }).select('description amount frequency');
      res.status(200).json(allOthers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to update an existing Others entry
exports.updateOthers = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const updatedOthers = await Income.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      
      if (!updatedOthers) {
        return res.status(404).json({ message: 'Others entry not found' });
      }
      
      res.status(200).json(updatedOthers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to delete an existing Others entry
exports.deleteOthers = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedOthers = await Others.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedOthers) {
        return res.status(404).json({ message: 'Others entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific income entry by ID
// exports.getOthersById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const others = await Others.findOne({ _id: req.params.id, userId });

//     if (!others) {
//       return res.status(404).json({ message: 'Others entry not found' });
//     }

//     res.status(200).json(others);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };