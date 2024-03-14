const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db.js").sequelize;
const Dispenser = require("../models/dispenserModel.js");

class Location extends Model {}

Location.init({
  locationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  building: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  streetNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  daysOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[0, 1]],
    },
  },
  openTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  closeTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  numFloors: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Location.hasMany(Dispenser, {
  foreignKey: {
    type: DataTypes.INTEGER,
    field: "locationId",
    name: "dispensers",
  },
});

module.exports = Location.init(attributes, {
  sequelize,
  modelName: "Location",
  timestamps: false,
});
