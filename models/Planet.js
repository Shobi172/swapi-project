const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  name: String,
  diameter: String,
  rotation_period: String,
  orbital_period: String,
  gravity: String,
  population: String,
  climate: String,
  terrain: String,
  surface_water: String,
  residents: [String],
  films: [String],
  url: String,
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;
