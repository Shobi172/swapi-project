const express = require('express');
const router = express.Router();
const starshipsController = require('../controller/starshipsController');

router.get('/starships', starshipsController.getAllStarships);

module.exports = router;
