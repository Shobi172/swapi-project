const express = require('express');
const router = express.Router();
const speciesController = require('../controller/speciesController');

router.get('/species', speciesController.getAllSpecies);

module.exports = router;
