const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Models
const Film = require("./models/Film");
const People = require("./models/People");
const Planet = require("./models/Planet");
const Species = require("./models/Species");
const Starship = require("./models/Starship");
const Vehicle = require("./models/vehicle");

// Routes
const filmsRoutes = require("./routes/filmsRoutes");
const peopleRoutes = require("./routes/peopleRoutes");
const planetsRoutes = require("./routes/planetRoutes");
const speciesRoutes = require("./routes/speciesRoutes");
const starshipsRoutes = require("./routes/starshipsRoutes");
const vehiclesRoutes = require("./routes/vehicleRoutes");

app.use("/api", filmsRoutes);
app.use("/api", peopleRoutes);
app.use("/api", planetsRoutes);
app.use("/api", speciesRoutes);
app.use("/api", starshipsRoutes);
app.use("/api", vehiclesRoutes);

// Function to fetch data from SWAPI
const fetchDataFromSWAPI = async (endpoint, Model) => {
  try {
    const response = await axios.get(
      `${process.env.SWAPI_BASE_URL}${endpoint}`
    );
    const data = response.data.results;
    await Model.deleteMany({});
    await Model.insertMany(data);
    console.log(`${endpoint} data updated successfully`);
  } catch (error) {
    console.error(`Failed to update ${endpoint} data:`, error);
  }
};

// Cron jobs to update data from SWAPI
const endpoints = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles",
];

endpoints.forEach((endpoint) => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      switch (endpoint) {
        case "films":
          await fetchDataFromSWAPI(endpoint, Film);
          break;
        case "people":
          await fetchDataFromSWAPI(endpoint, People);
          break;
        case "planets":
          await fetchDataFromSWAPI(endpoint, Planet);
          break;
        case "species":
          await fetchDataFromSWAPI(endpoint, Species);
          break;
        case "starships":
          await fetchDataFromSWAPI(endpoint, Starship);
          break;
        case "vehicles":
          await fetchDataFromSWAPI(endpoint, Vehicle);
          break;
        default:
          break;
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
