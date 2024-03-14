const Dispenser = require("../models/dispenserModel.js");
const asyncHandler = require("express-async-handler");

// Create
// JSON in http request so just extract that and then dispenser.create
exports.createDispenser = asyncHandler(async (req, res) => {
  const dispenser = await Dispenser.create(req.body);
  return JSON.stringify(dispenser);
});

// Delete
exports.deleteDispenser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Dispenser.destroy({
    where: { dispenserId: id },
  });
  return res.status(200).send("You've successfully deleted!");
});

// Update
exports.updateDispenser = asyncHandler(async (req, res) => {
  const id = req.params.dispenserID;
  const updatedDispenser = await Dispenser.update(req.body, {
    where: { dispenserId: id },
  });
  return JSON.stringify(updatedDispenser);
});

// Find dispensers depending on if the user inputted a location or avgRating
// TODO: Later implement a means of requesting dispensers to be returned based on multiple locations (ex. water dispensers
// in Olin + Sci li)
exports.dispenserByLocation = asyncHandler(async (req, res) => {
  let whereClause = {};
  if (req.params.locationId != null) {
    whereClause.location_id = req.params.locationId;
  }
  if (req.params.avgRating != null) {
    whereClause.avg_rating = req.params.avgRating;
  }

  const dispensersInLocation = await Dispenser.findAll({
    where: whereClause,
  });
  return JSON.stringify(dispensersInLocation);
});

// Find dispenser by ID
exports.dispenserById = asyncHandler(async (req, res) => {
  const id = req.params.dispenserId;
  const dispenser = await Dispenser.findByPk(id);
  return JSON.stringify(dispenser);
});

// Find all dispensers
exports.dispensers = asyncHandler(async (req, res) => {
  const dispensers = await Dispenser.findAll();
  return JSON.stringify(dispensers);
});
