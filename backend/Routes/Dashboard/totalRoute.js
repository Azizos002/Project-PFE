const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/auth');
const totalMonthlyController = require('../../Controllers/Dashboard/TotalMonthly/totalMonthlyController')

router.use(verifyJWT);

// Route to save or update total monthly value
router.post('/saveOrUpdateTotal', totalMonthlyController.saveOrUpdateTotal);

router.get('/fetchTotal', totalMonthlyController.fetchTotal);

module.exports = router;