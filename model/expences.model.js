const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expences = sequelize.define("expences", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  item: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expences;
