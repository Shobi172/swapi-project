const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: String,
  episode_id: Number,
  opening_crawl: String,
  director: String,
  producer: String,
  release_date: Date,
  species: [String],
  starships: [String],
  vehicles: [String],
  characters: [String],
  planets: [String],
  url: String,
  comments: [
    {
      user: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  ratings: [
    {
      user: String,
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  created: Date,
  edited: Date,
});

module.exports = mongoose.model("Film", filmSchema);
