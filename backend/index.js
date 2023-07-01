// Dependencies
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

// To handel cros issue
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const dbConnection = require("./config/database");

// Impoting Routes
const { userRouter, expenseRouter, paymentRouter, nodeMailerRoute,} = require("./route");

// Models
const { Expense, User, Order, PasswordTable } = require("./model");

// Routes
app.use("/api/user", userRouter);
app.use("/api/main", expenseRouter);
app.use("/api/razorpay", paymentRouter);
app.use("/api/nodemail", nodeMailerRoute);

// Database connection
(async () => {
  try {
    await dbConnection.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Sync models with the database
    await User.sync();
    await Expense.sync();
    await Order.sync();
    await PasswordTable.sync();

    console.log("Models synced to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Starting the server
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("App listening on port 3000");
});
