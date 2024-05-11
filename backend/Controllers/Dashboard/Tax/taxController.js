// taxController.js
const Tax = require('../../../models/Dashboard/Tax');

// Controller function to create a new Tax entry
exports.createTax = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const newTax = await Tax.create({ userId, ...req.body  });
  
      res.status(201).json(newTax);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get all Tax entries for a user
exports.getAllTax = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const allTax = await Tax.find({ userId }).select('description amount frequency');
      res.status(200).json(allTax);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to update an existing Tax entry
exports.updateTax = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const updatedTax = await Tax.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      
      if (!updatedTax) {
        return res.status(404).json({ message: 'Tax entry not found' });
      }
      
      res.status(200).json(updatedTax);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to delete an existing Tax entry
exports.deleteTax = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedTax = await Tax.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedTax) {
        return res.status(404).json({ message: 'Tax entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific Tax entry by ID
// exports.getTaxById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const tax = await Tax.findOne({ _id: req.params.id, userId });

//     if (!tax) {
//       return res.status(404).json({ message: 'Tax entry not found' });
//     }

//     res.status(200).json(tax);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };