const express = require('express');
const filmsController = require('../controller/filmsController');

const router = express.Router();

router.get('/films', filmsController.getFilms);
router.post('/films/:filmId/comments', filmsController.addComment);
router.post('/films/:filmId/ratings', filmsController.addRating);

module.exports = router;
