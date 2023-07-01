// Dependencies

// const Sequelize = require('sequelize') ;

// const sequelize = new Sequelize('advance_expenses_tracker', 'root', '1234567890', {
//   dialect : 'mysql',
//   host : 'localhost'
// })

// module.exports = sequelize

// Dependencies
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
