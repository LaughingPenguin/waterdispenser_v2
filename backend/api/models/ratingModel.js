/* Rating model, representing the ratings table in database
   Access model with sequelize.models.User
*/
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db.js").sequelize;

class Rating extends Model {}
const attributes = {
  ratingId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "rating_id",
  },
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "user_id",
  },
  dispenserId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "dispenser_id",
  },
  ratingNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "rating_num",
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
};

module.exports = Rating.init(attributes, {
  sequelize,
  modelName: "Rating",
  timestamps: true,
  createdAt: "timestamp",
  updatedAt: false,
});
