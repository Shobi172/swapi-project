const axios = require("axios");
const Vehicle = require("../models/vehicle");

const fetchVehiclesFromSWAPI = async () => {
  try {
    const response = await axios.get(`${process.env.SWAPI_BASE_URL}vehicles/`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch vehicles from SWAPI");
  }
};

const getAllVehicles = async (req, res) => {
  try {
    let vehicles = await Vehicle.find();

    if (!vehicles.length) {
      const vehiclesData = await fetchVehiclesFromSWAPI();
      await Vehicle.insertMany(vehiclesData);
      vehicles = Vehicle.find();
    }

    // Search

    if (req.query.search) {
      const searchRegExp = new RegExp(req.query.search, "i");
      vehicles = vehicles.filter(
        (vehicle) =>
          (vehicle.name && vehicle.name.match(searchRegExp)) ||
          (vehicle.model && vehicle.model.match(searchRegExp))
      );
    }

    // Filtering

    if (req.query.vehicle_class) {
      const vehicle_classNameParts = req.query.vehicle_class.split(" ");
      const vehicle_classRegex = vehicle_classNameParts.map(
        (part) => new RegExp(part, "i")
      );
      vehicles = vehicles.filter((vehicle) =>
        vehicle_classRegex.every((regexPart) =>
          regexPart.test(vehicle.vehicle_class)
        )
      );
    }

    if (req.query.manufacturer) {
      const manufacturerNameParts = req.query.manufacturer.split(" ");
      const manufacturerRegex = manufacturerNameParts.map(
        (part) => new RegExp(part, "i")
      );
      vehicles = vehicles.filter((vehicle) =>
        manufacturerRegex.every((regexPart) =>
          regexPart.test(vehicle.manufacturer)
        )
      );
    }

    // Sorting
    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(",");
      vehicles.sort((a, b) => {
        for (const field of sortFields) {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
        }
        return 0;
      });
    }

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllVehicles };
