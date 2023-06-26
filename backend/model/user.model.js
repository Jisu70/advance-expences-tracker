const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Expense = require("./expenses.model");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPremium: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, 
  },
});

module.exports = User;
