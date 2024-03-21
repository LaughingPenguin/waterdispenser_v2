const { Op } = require("sequelize");
const Dispenser = require("../models/dispenserModel.js");
const asyncHandler = require("express-async-handler");

// Create
// JSON in http request so just extract that and then dispenser.create
exports.createDispenser = asyncHandler(async (req, res, next) => {
  const dispenser = await Dispenser.create(req.body);
  res.send(JSON.stringify(dispenser, null, 2));
});

// Delete
exports.deleteDispenser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Dispenser.destroy({
    where: { dispenserId: id },
  });
  res.send(res.status(200).send("You've successfully deleted!"));
});

// Update
exports.updateDispenser = asyncHandler(async (req, res, next) => {
  const id = req.params.dispenserID;
  const updatedDispenser = await Dispenser.update(req.body, {
    where: { dispenserId: id },
  });
});

// See posts here:
// https://stackoverflow.com/questions/8806844/
// https://stackoverflow.com/questions/57613011/
// https://stackoverflow.com/questions/207477/
exports.getDispensersByOr = asyncHandler(async (req, res, next) => {
  let whereClause = [];
  if (req.query.locationId != null) {
    whereClause.push({ locationId: req.query.locationId });
  }
  if (req.query.floorNum != null) {
    whereClause.push({ floorNum: req.query.floorNum });
  }
  if (req.query.avgRating != null) {
    whereClause.push({ avgRating: req.query.avgRating });
  }

  const dispenserByFilter = await Dispenser.findAll({
    where: {
      [Op.or]: whereClause,
    },
  });
  res.send(JSON.stringify(dispenserByFilter, null, 2));
});

exports.getDispensersByAnd = asyncHandler(async (req, res, next) => {
  let whereClause = [];
  if (req.query.locationId != null) {
    whereClause.push({ locationId: req.query.locationId });
  }
  if (req.query.floorNum != null) {
    whereClause.push({ floorNum: req.query.floorNum });
  }
  if (req.query.avgRating != null) {
    whereClause.push({ avgRating: req.query.avgRating });
  }

  const dispensersByFilter = await Dispenser.findAll({
    where: {
      [Op.and]: whereClause,
    },
  });
  res.send(JSON.stringify(dispensersByFilter, null, 2));
});

// Find dispenser by ID
exports.getDispenserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const dispenser = await Dispenser.findByPk(id);
  res.send(JSON.stringify(dispenser, null, 2));
});

// Find all dispensers
exports.getDispensers = asyncHandler(async (req, res, next) => {
  const dispensers = await Dispenser.findAll();
  res.send(JSON.stringify(dispensers, null, 2));
});
