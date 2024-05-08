const express = require('express');
const router = express.Router();
const incomeController = require('../Controllers/Income/incomeController');
const verifyJWT = require('../middleware/auth'); // Import the verifyJWT middleware

// Apply the verifyJWT middleware to protect the income routes
router.use(verifyJWT);

// Route to create a new income entry
router.post('/createIncome', incomeController.createIncome);

// Route to get all income entries for a user
router.get('/getIncome', incomeController.getAllIncome);


// Route to update an existing income entry
router.put('/update/:id', incomeController.updateIncome);

// Route to delete an existing income entry
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;

// Route to get a specific income entry by ID
// router.get('/:id', incomeController.getIncomeById);