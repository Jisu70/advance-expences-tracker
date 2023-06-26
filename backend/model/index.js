const Expense = require("./expenses.model");
const User = require("./user.model");
const Order = require("./order.model");

Expense.belongsTo(User);
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = { Expense, User, Order };
