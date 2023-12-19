const axios = require("axios");
const People = require("../models/People");

const fetchPeopleFromSWAPI = async () => {
  try {
    const response = await axios.get(`${process.env.SWAPI_BASE_URL}people/`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch people from SWAPI");
  }
};

const getAllPeople = async (req, res) => {
  try {
    let people = await People.find();

    if (!people.length) {
      const peopleData = await fetchPeopleFromSWAPI();
      await People.insertMany(peopleData);
      people = People.find();
    }

    // Search

    if (req.query.search) {
      const searchRegExp = new RegExp(req.query.search, "i");
      people = people.filter(
        (person) =>
          (person.name && person.name.match(searchRegExp)) ||
          (person.birth_year && person.birth_year.match(searchRegExp)) ||
          (person.gender && person.gender.match(searchRegExp))
      );
    }

    // Filter
    if (req.query.gender) {
      people = people.where("gender").equals(req.query.gender);
    }
    if (req.query.eye_color) {
      people = people.where("eye_color").equals(req.query.eye_color);
    }
    if (req.query.hair_color) {
      peopleQuery = peopleQuery
        .where("hair_color")
        .equals(req.query.hair_color);
    }

    // Sorting
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(",");
      people.sort((a, b) => {
        for (const field of sortFields) {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
        }
        return 0;
      });
    }

    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPeople };
