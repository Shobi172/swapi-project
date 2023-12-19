const mongoose = require("mongoose");

const starshipSchema = new mongoose.Schema({
  name: String,
  model: String,
  starship_class: String,
  manufacturer: String,
  cost_in_credits: String,
  length: String,
  crew: String,
  passengers: String,
  max_atmosphering_speed: String,
  hyperdrive_rating: String,
  MGLT: String,
  cargo_capacity: String,
  consumables: String,
  films: [String],
  pilots: [String],
  url: String,
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
});

const Starship = mongoose.model("Starship", starshipSchema);

module.exports = Starship;
