// Dependencies
// const Sequelize = require('sequelize') ;

// const sequelize = new Sequelize('advanceExpences_tracker', 'root', '1234567890', {
//   dialect : 'mysql',
//   host : 'localhost'
// })

// module.exports = sequelize

// Dependencies
// for online database
const Sequelize = require("sequelize");

const sequelize = new Sequelize("todo_application", "sudipta70", "123456789", {
  host: "db4free.net",
  dialect: "mysql",
  // logging: false, // This will stop the connection message from console
});

module.exports = sequelize;
