const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db.js").sequelize;
const Dispenser = require("../models/dispenserModel.js");

class Location extends Model {}
const attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "location_id",
  },
  building: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  streetNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "street_num",
  },
  street: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  daysOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "days_of_week",
    validate: {
      isIn: [[0, 1]],
    },
  },
  openTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "open_time",
  },
  closeTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "close_time",
  },
  numFloors: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "num_floors",
  },
};

// Location.hasMany(Dispenser, {
//   foreignKey: {
//     type: DataTypes.INTEGER,
//     field: "location_id",
//     name: "locationId",
//   },
// });

module.exports = Location.init(attributes, {
  sequelize,
  modelName: "Location",
  timestamps: false,
});
