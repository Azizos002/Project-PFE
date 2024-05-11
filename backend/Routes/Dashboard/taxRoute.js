const express = require('express');
const router = express.Router();
const taxController = require('../../Controllers/Dashboard/Tax/taxController')
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createTax', taxController.createTax);

router.get('/getTax', taxController.getAllTax);

router.put('/updateTax/:id', taxController.updateTax);

router.delete('/:id', taxController.deleteTax);

module.exports = router;

// Route to get a specific income entry by ID
// router.get('/:id', taxController.getTaxById);