const { DataTypes, Model } = require("sequelize");
const Location = require("../models/locationModel.js");

const sequelize = require("../../database/db.js").sequelize;

class Dispenser extends Model {}

const attributes = {
  dispenserId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
  },
  floorNum: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
  },
  avgRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

Dispenser.belongsTo(Location, {
  foreignKey: {
    type: DataTypes.INTEGER,
    field: "location_id",
    name: "Location",
  },
});

module.exports = Dispenser.init(attributes, {
  sequelize,
  modelName: "Dispenser",
  timestamps: false,
});
