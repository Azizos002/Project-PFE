// foodController.js
const Food = require('../../../models/Dashboard/Food')

// Controller function to create a new Food entry
exports.createFood = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const newFood = await Food.create({ userId, ...req.body  });
  
      res.status(201).json(newFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get all Food entries for a user
exports.getAllFood = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const allFood = await Food.find({ userId }).select('description amount frequency');
      res.status(200).json(allFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to update an existing Food entry
exports.updateFood = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const updatedFood = await Food.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      
      if (!updatedFood) {
        return res.status(404).json({ message: 'Food entry not found' });
      }
      
      res.status(200).json(updatedFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to delete an existing Food entry
exports.deleteFood = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedFood = await Food.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedFood) {
        return res.status(404).json({ message: 'Food entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific Food entry by ID
// exports.getFoodById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const food = await Food.findOne({ _id: req.params.id, userId });

//     if (!food) {
//       return res.status(404).json({ message: 'Food entry not found' });
//     }

//     res.status(200).json(food);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };