const express = require('express');
const router = express.Router();
const incomeController = require('../../Controllers/Dashboard/Income/incomeController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createIncome', incomeController.createIncome);

router.get('/getIncome', incomeController.getAllIncome);

router.put('/updateIncome/:id', incomeController.updateIncome);

router.delete('/:id', incomeController.deleteIncome);

module.exports = router;

// Route to get a specific income entry by ID
// router.get('/:id', incomeController.getIncomeById);