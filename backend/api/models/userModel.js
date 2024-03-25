/* User model, representing the users table in database
   Access model with sequelize.models.User
*/
const { DataTypes, Model } = require("sequelize");
const validator = require("validator");
const argon2 = require("argon2");

// TODO: define __dirname
const sequelize = require("../../database/db.js").sequelize;

// TODO: verify that STRING maps to VARCHAR, see issue here:
// https://github.com/sequelize/sequelize/issues/6036
class User extends Model {}
const attributes = {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: "user_id",
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      isWesleyanEmail(email) {
        if (
          !validator.isEmail(email, {
            host_whitelist: ["wesleyan.edu", "wesleyan"],
          })
        ) {
          throw new Error("Not a Wesleyan address");
        }
      },
    },
  },
  firstName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "firstname",
  },
  lastName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "lastname",
  },
  token: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: "refresh_token",
  },
  uniqueId: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "unique_id",
  },
};

User.init(attributes, {
  sequelize,
  modelName: "User",
  timestamps: true,
  createdAt: "joined",
  updatedAt: false,
});

User.beforeCreate(async (user, options) => {
  const hashedToken = await argon2.hash(user.token);
  user.token = hashedToken;
});

module.exports = User;