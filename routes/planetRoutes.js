const express = require('express');
const router = express.Router();
const planetController = require('../controller/planetController');

router.get('/planets', planetController.getAllPlanets);

module.exports = router;
