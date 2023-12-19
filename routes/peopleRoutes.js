const express = require('express');
const router = express.Router();
const peopleController = require('../controller/peopleController');


router.get('/people', peopleController.getAllPeople);

module.exports = router;
