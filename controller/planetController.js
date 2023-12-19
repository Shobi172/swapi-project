const axios = require("axios");
const Planet = require("../models/Planet");

const fetchPlanetsFromSWAPI = async () => {
  try {
    const response = await axios.get(`${process.env.SWAPI_BASE_URL}planets/`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch planets from SWAPI");
  }
};

const getAllPlanets = async (req, res) => {
  try {
    let planets = await Planet.find();

    if (!planets.length) {
      const planetsData = await fetchPlanetsFromSWAPI();
      await Planet.insertMany(planetsData);
      planets = Planet.find();
    }

    // Search
    if (req.query.search) {
      planets = planets.filter((planet) =>
        planet.name.match(new RegExp(req.query.search, "i"))
      );
    }

    // Filtering

    if (req.query.population) {
      const populationNameParts = req.query.population.split(" ");
      const populationRegex = populationNameParts.map(
        (part) => new RegExp(part, "i")
      );
      planets = planets.filter((plan) =>
        populationRegex.every((regexPart) => regexPart.test(plan.population))
      );
    }

    if (req.query.climate) {
      const climateNameParts = req.query.climate.split(" ");
      const climateRegex = climateNameParts.map(
        (part) => new RegExp(part, "i")
      );
      planets = planets.filter((plan) =>
        climateRegex.every((regexPart) => regexPart.test(plan.climate))
      );
    }

    // Sorting
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(",");
      planets.sort((a, b) => {
        for (const field of sortFields) {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
        }
        return 0;
      });
    }

    res.json(planets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPlanets };
