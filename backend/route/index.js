// Import the route files
const userRouter = require('./user.route');
const expenseRuter = require('./expenses.main');
const paymentRouter = require('./razorpay.route');
const nodeMailerRoute = require('./nodeMailer');

// Export all the routes
module.exports = {
  userRouter,
  expenseRuter,
  paymentRouter,
  nodeMailerRoute,
};
