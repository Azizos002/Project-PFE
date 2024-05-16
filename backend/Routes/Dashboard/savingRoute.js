const express = require('express');
const router = express.Router();
const savingController = require('../../Controllers/Dashboard/Saving/savingController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createSaving', savingController.createSaving);

router.get('/getSaving', savingController.getAllSaving);

router.put('/updateSaving/:id', savingController.updateSaving);

router.delete('/:id', savingController.deleteSaving);

module.exports = router;

// Route to get a specific Saving entry by ID
// router.get('/:id', savingController.getSavingById);