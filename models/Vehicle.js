const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: String,
  model: String,
  vehicle_class: String,
  manufacturer: String,
  length: String,
  cost_in_credits: String,
  crew: String,
  passengers: String,
  max_atmosphering_speed: String,
  cargo_capacity: String,
  consumables: String,
  films: [{ type: String, ref: "Film" }],
  pilots: [{ type: String, ref: "People" }],
  url: String,
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
