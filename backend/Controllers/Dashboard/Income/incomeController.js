// incomeController.js
const Income = require('../../../models/Dashboard/Income');


// Controller function to create a new income entry
exports.createIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const newIncome = await Income.create({ userId, ...req.body  });

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all income entries for a user
exports.getAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const allIncome = await Income.find({ userId }).select('description amount frequency');
    res.status(200).json(allIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to update an existing income entry
exports.updateIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    
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
    const userId = req.user.id;
    
    const deletedIncome = await Income.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income entry not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a specific income entry by ID
// exports.getIncomeById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const income = await Income.findOne({ _id: req.params.id, userId });

//     if (!income) {
//       return res.status(404).json({ message: 'Income entry not found' });
//     }

//     res.status(200).json(income);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };