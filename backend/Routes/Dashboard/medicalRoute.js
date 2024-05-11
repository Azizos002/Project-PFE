const express = require('express');
const router = express.Router();
const medicalController = require('../../Controllers/Dashboard/Medical/medicalController')
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createMedical', medicalController.createMedical);

router.get('/getMedical', medicalController.getAllMedical);

router.put('/updateMedical/:id', medicalController.updateMedical);

router.delete('/:id', medicalController.deleteMedical);

module.exports = router;

// Route to get a specific income entry by ID
// router.get('/:id', medicalController.getMedicalById);