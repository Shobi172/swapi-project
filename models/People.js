const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  name: String,
  birth_year: String,
  eye_color: String,
  gender: String,
  hair_color: String,
  height: String,
  mass: String,
  skin_color: String,
  homeworld: String,
  films: [String],
  species: [String],
  starships: [String],
  vehicles: [String],
  url: String,
  created: String,
  edited: String,
});

module.exports = mongoose.model('People', peopleSchema);
