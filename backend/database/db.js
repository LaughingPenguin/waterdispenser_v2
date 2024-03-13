require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.PROJECT_DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
  }
);

try {
  /* TODO:
     Figure out why await sequelize.authenticate(); is not working, given
     the docs provided: https://sequelize.org/docs/v6/getting-started/

     Move try {} catch (error) {} to file of initial require('db.js') call
  */
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* Issues with exporting instance of sequelize in previous code:
   const Sequelize = require("sequelize");
   const sequelize = new Sequelize ( ... );
   exports.connection = sequelize;

   Changed to const db = {}, see https://stackoverflow.com/questions/33091197/
*/
module.exports = db;
