const axios = require("axios");
const Starship = require("../models/Starship");

const fetchStarshipsFromSWAPI = async () => {
  try {
    const response = await axios.get(`${process.env.SWAPI_BASE_URL}starships/`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch starships from SWAPI");
  }
};

const getAllStarships = async (req, res) => {
  try {
    let starships = await Starship.find();

    if (!starships.length) {
      const starshipsData = await fetchStarshipsFromSWAPI();
      await Starship.insertMany(starshipsData);
      starships = Starship.find();
    }

    // Search

    if (req.query.search) {
      const searchRegExp = new RegExp(req.query.search, "i");
      starships = starships.filter(
        (starship) =>
          (starship.name && starship.name.match(searchRegExp)) ||
          (starship.model && starship.model.match(searchRegExp))
      );
    }

    // Filter

    if (req.query.manufacturer) {
      const manufacturerNameParts = req.query.manufacturer.split(" ");
      const manufacturerRegex = manufacturerNameParts.map(
        (part) => new RegExp(part, "i")
      );
      starships = starships.filter((starship) =>
        manufacturerRegex.every((regexPart) =>
          regexPart.test(starship.manufacturer)
        )
      );
    }

    if (req.query.starship_class) {
      const starship_classNameParts = req.query.starship_class.split(" ");
      const starship_classRegex = starship_classNameParts.map(
        (part) => new RegExp(part, "i")
      );
      starships = starships.filter((starship) =>
        starship_classRegex.every((regexPart) =>
          regexPart.test(starship.starship_class)
        )
      );
    }

    // Sorting
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(",");
      starships.sort((a, b) => {
        for (const field of sortFields) {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
        }
        return 0;
      });
    }

    res.json(starships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllStarships };
