const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema({
  name: String,
  classification: String,
  designation: String,
  average_height: String,
  average_lifespan: String,
  eye_colors: String,
  hair_colors: String,
  skin_colors: String,
  language: String,
  homeworld: String,
  people: [{ type: String, ref: "People" }],
  films: [{ type: String, ref: "Film" }],
  url: String,
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
});

const Species = mongoose.model("Species", speciesSchema);

module.exports = Species;
