const express = require('express');
const router = express.Router();
const exportController = require('../../Controllers/Dashboard/exportController');
const verifyJWT = require('../../middleware/auth');

router.use(verifyJWT);

router.get('/exportCSV', exportController.exportToCSV);

module.exports = router;