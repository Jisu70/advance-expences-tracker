// Dependencies
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const dbConnection = require("./config/database");

// Routes
const userRouter = require("./route/user.route");
const mainRouter = require("./route/expences.main");
const paymentRoute = require("./route/razorpay.route");

// Models
const Expence = require("./model/expences.model");
const User = require("./model/user.model");

// Routes
app.use("/api/user", userRouter);
app.use("/api/main", mainRouter);
app.use("/api/razorpay", paymentRoute);

// To define the models in the database
(async () => {
  try {
    await dbConnection.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Sync models with the database
    await Expence.sync();
    await User.sync();

    console.log("Models synced to the database.");

    // Association
    User.hasMany(Expence);
    Expence.belongsTo(User);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Starting the server
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("App listening on port 3000");
});
