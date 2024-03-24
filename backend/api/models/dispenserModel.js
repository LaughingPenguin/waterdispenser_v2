const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db.js").sequelize;
const Location = require("../models/locationModel.js");

class Dispenser extends Model {}

const attributes = {
  dispenserId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
    field: "dispenser_id",
  },
  locationId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
    field: "location_id",
  },
  floorNum: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
    field: "floor_num",
  },
  avgRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "avg_rating",
  },
};

Dispenser.init(attributes, {
  sequelize,
  modelName: "Dispenser",
  timestamps: false,
});

Dispenser.belongsTo(Location, {
  foreignKey: {
    type: DataTypes.INTEGER,
    field: "location_id",
    name: "locationId",
  },
});

module.exports = Dispenser;
