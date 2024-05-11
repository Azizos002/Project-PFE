// clothingController.js
const Clothing = require('../../../models/Dashboard/Clothing');

// Controller function to create a new Clothing entry
exports.createClothing = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const newClothing = await Clothing.create({ userId, ...req.body  });
  
      res.status(201).json(newClothing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get all Clothing entries for a user
exports.getAllClothing = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const allClothing = await Clothing.find({ userId }).select('description amount frequency');
      res.status(200).json(allClothing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Controller function to update an existing Clothing entry
exports.updateClothing = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const updatedClothing = await Clothing.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      
      if (!updatedClothing) {
        return res.status(404).json({ message: 'Clothing entry not found' });
      }
      
      res.status(200).json(updatedClothing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to delete an existing Clothing entry
exports.deleteClothing = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedClothing = await Clothing.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedClothing) {
        return res.status(404).json({ message: 'Clothing entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific Clothing entry by ID
// exports.getClothingById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const clothing = await Clothing.findOne({ _id: req.params.id, userId });

//     if (!clothing) {
//       return res.status(404).json({ message: 'Clothing entry not found' });
//     }

//     res.status(200).json(clothing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };