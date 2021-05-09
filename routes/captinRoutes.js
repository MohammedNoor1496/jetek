const express = require('express')
const captinController = require('../controllers/captin-controller');
const captinAuth = require('../utils/auth');
const router = express.Router()

router.post('/createcaptin', captinController.createCaptin);

module.exports = router;