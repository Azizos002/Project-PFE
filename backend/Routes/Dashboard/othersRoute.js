const express = require('express');
const router = express.Router();
const othersController = require('../../Controllers/Dashboard/Others/othersController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createOthers', othersController.createOthers);

router.get('/getOthers', othersController.getAllOthers);

router.put('/updateOthers/:id', othersController.updateOthers);

router.delete('/:id', othersController.deleteOthers);

module.exports = router;

// Route to get a specific income entry by ID
// router.get('/:id', othersController.getIncomeById);