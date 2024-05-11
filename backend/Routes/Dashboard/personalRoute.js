const express = require('express');
const router = express.Router();
const personalController = require('../../Controllers/Dashboard/Personal/personalController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.post('/createPersonal', personalController.createPersonal);

router.get('/getPersonal', personalController.getAllPersonal);

router.put('/updatePersonal/:id', personalController.updatePersonal);

router.delete('/:id', personalController.deletePersonal);

module.exports = router;

// Route to get a specific Personal entry by ID
// router.get('/:id', personalController.getPersonalById);