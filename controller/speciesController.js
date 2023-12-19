const axios = require("axios");
const Species = require("../models/Species");

const fetchSpeciesFromSWAPI = async () => {
  try {
    const response = await axios.get(`${process.env.SWAPI_BASE_URL}species/`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch species from SWAPI");
  }
};

const getAllSpecies = async (req, res) => {
  try {
    let species = await Species.find();

    if (!species.length) {
      const speciesData = await fetchSpeciesFromSWAPI();
      await Species.insertMany(speciesData);
      species = Species.find();
    }

    // Search

    if (req.query.search) {
      species = species.filter((specie) =>
        specie.title.match(new RegExp(req.query.search, "i"))
      );
    }

    // Filtering

    if (req.query.classification) {
      const classificationNameParts = req.query.classification.split(" ");
      const classificationRegex = classificationNameParts.map(
        (part) => new RegExp(part, "i")
      );
      species = species.filter((specie) =>
        classificationRegex.every((regexPart) =>
          regexPart.test(specie.classification)
        )
      );
    }

    if (req.query.designation) {
      query = query.where("designation").equals(req.query.designation);
    }

    if (req.query.designation) {
      const designationNameParts = req.query.designation.split(" ");
      const designationRegex = designationNameParts.map(
        (part) => new RegExp(part, "i")
      );
      species = species.filter((specie) =>
        designationRegex.every((regexPart) =>
          regexPart.test(specie.designation)
        )
      );
    }

    // Sorting
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(",");
      species.sort((a, b) => {
        for (const field of sortFields) {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
        }
        return 0;
      });
    }

    res.json(species);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllSpecies };
