const express = require('express');
const router = express.Router();
const ChartJsController = require('../Controllers/ChartJs')
const verifyJWT = require('../middleware/auth');

router.use(verifyJWT);

router.get('/getAll', ChartJsController.ChartFetch)

module.exports = router;
