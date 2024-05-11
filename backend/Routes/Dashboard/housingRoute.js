const express = require('express');
const router = express.Router();
const housingController = require('../../Controllers/Dashboard/Housing/housingController')
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createHousing', housingController.createHousing);

router.get('/getHousing', housingController.getAllHousing);

router.put('/update/:id', housingController.updateHousing);

router.delete('/:id', housingController.deleteHousing);

module.exports = router;