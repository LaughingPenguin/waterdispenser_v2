/* Rating model, representing the ratings table in database
   Access model with sequelize.models.User
*/
const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../../database/db.js").sequelize;
const User = require("./userModel.js");
// const Dispenser = require("./dispenserModel.js");

class Rating extends Model {}
const attributes = {
  ratingId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "rating_id",
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

Rating.init(attributes, {
  sequelize,
  modelName: "Rating",
  timestamps: true,
  createdAt: "timestamp",
  updatedAt: false,
});
/* According to documentation, defaults for One-To-One associations is SET NULL
   for ON DELETE and CASCADE for ON UPDATE. Do not configure any specific
   behaviors for now.

   A.belongsTo(B), with the foreign key being defined in source model A
*/
Rating.belongsTo(User, {
  foreignKey: {
    type: DataTypes.INTEGER,
    field: "user_id",
    name: "userId",
  },
});
// Rating.belongsTo(Dispenser, {
//   foreignKey: {
//     type: DataTypes.INTEGER,
//     field: "dispenser_id",
//     name: "dispenserId",
//   },
// });

module.exports = Rating