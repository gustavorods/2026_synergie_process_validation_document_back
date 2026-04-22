const express = require('express');
const router = express.Router();
const dvpController = require('../controllers/dvpController');

router.post('/generate-dvp', dvpController.generateDvp);

module.exports = router;