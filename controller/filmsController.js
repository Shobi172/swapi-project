const axios = require("axios");
const Film = require("../models/Film");

const PAGE_SIZE = 10;

const fetchFilmsFromSWAPI = async () => {
  try {
    const response = await axios.get(`${process.env.SWAPI_BASE_URL}films`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch films from SWAPI");
  }
};

const getFilms = async (req, res) => {
  try {
    let films = await Film.find();

    if (!films.length) {
      const filmsData = await fetchFilmsFromSWAPI();
      await Film.insertMany(filmsData);

      films = await Film.find();
    }

    // Search
    if (req.query.search) {
      films = films.filter((film) =>
        film.title.match(new RegExp(req.query.search, "i"))
      );
    }

    // Filtering
    if (req.query.director) {
      const directorNameParts = req.query.director.split(" ");
      const directorRegex = directorNameParts.map(
        (part) => new RegExp(part, "i")
      );
      films = films.filter((film) =>
        directorRegex.every((regexPart) => regexPart.test(film.director))
      );
    }

    if (req.query.producer) {
      const producerNameParts = req.query.producer.split(" ");
      const producerRegex = producerNameParts.map(
        (part) => new RegExp(part, "i")
      );
      films = films.filter((film) =>
        producerRegex.every((regexPart) => regexPart.test(film.producer))
      );
    }

    // Sorting
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(",");
      films.sort((a, b) => {
        for (const field of sortFields) {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
        }
        return 0;
      });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    const results = films.slice(startIndex, endIndex);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to add a comment to a film
const addComment = async (req, res) => {
  const { filmId } = req.params;
  console.log(req.body);
  const { user, text } = req.body;

  try {
    const film = await Film.findById(filmId);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    film.comments.push({ user, text });
    await film.save();

    res.status(201).json({ message: "Comment added successfully", film });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to add a rating to a film
const addRating = async (req, res) => {
  const { filmId } = req.params;
  const { user, rating } = req.body;

  try {
    const film = await Film.findById(filmId);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    film.ratings.push({ user, rating });
    await film.save();

    res.status(201).json({ message: "Rating added successfully", film });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getFilms, addComment, addRating };
