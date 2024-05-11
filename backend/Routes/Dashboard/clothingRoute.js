const express = require('express');
const router = express.Router();
const clothingController = require('../../Controllers/Dashboard/Clothing/clothingController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createClothing', clothingController.createClothing);

router.get('/getClothing', clothingController.getAllClothing);

router.put('/updateClothing/:id', clothingController.updateClothing);

router.delete('/:id', clothingController.deleteClothing);

module.exports = router;

// Route to get a specific Clothing entry by ID
// router.get('/:id', clothingController.getClothingById);