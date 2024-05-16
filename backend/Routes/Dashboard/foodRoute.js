const express = require('express');
const router = express.Router();
const foodController = require('../../Controllers/Dashboard/Food/foodController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createFood', foodController.createFood);

router.get('/getFood', foodController.getAllFood);

router.put('/updateFood/:id', foodController.updateFood);

router.delete('/:id', foodController.deleteFood);

module.exports = router;

// Route to get a specific Food entry by ID
// router.get('/:id', foodController.getFoodById);