// incomeController.js
const Income = require('../../models/Dashboard/Income');


// Controller function to create a new income entry
exports.createIncome = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const userId = req.user.id;

    // Create a new income entry with the user ID
    const newIncome = await Income.create({ userId, ...req.body  });

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all income entries for a user
exports.getAllIncome = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const userId = req.user.id;

    // Find all income entries for the user
    const allIncome = await Income.find({ userId }).select('description amount frequency');
    console.log(allIncome);
    res.status(200).json(allIncome);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


// Controller function to update an existing income entry
exports.updateIncome = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const userId = req.user.id;
    
    // Find and update the income entry by ID for the user
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    
    if (!updatedIncome) {
      return res.status(404).json({ message: 'Income entry not found' });
    }
    
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete an existing income entry
exports.deleteIncome = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const userId = req.user.id;
    
    // Find and delete the income entry by ID for the user
    const deletedIncome = await Income.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income entry not found' });
    }
    
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a specific income entry by ID
// exports.getIncomeById = async (req, res) => {
//   try {
//     // Extract user ID from JWT token
//     const userId = req.user.id;

//     // Find the income entry by ID for the user
//     const income = await Income.findOne({ _id: req.params.id, userId });

//     if (!income) {
//       return res.status(404).json({ message: 'Income entry not found' });
//     }

//     res.status(200).json(income);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };