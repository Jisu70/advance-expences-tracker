// Dependencies
const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

const dbConnection  = require('./util/database')

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.json());
// 
const userRouter = require("./route/user.route");
const mainRouter = require("./route/expences.main");

// Models
const epenceModel = require("./model/expences.model");
const userModel = require("./model/user.model");

// Routes
app.use('/api/user', userRouter);
app.use('/api/main', mainRouter);



// To define the models in the database
(async () => {
  try {
    await dbConnection.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync models with the database
    await epenceModel.sync({force : false});
    await userModel.sync({ force : false });

    console.log('Models synced to the database.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();







// Starting the server
app.listen(3000, (err) => {
  if (err) throw err;
  console.log(" app listen on port 3000 ");
});
