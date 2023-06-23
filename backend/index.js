// Dependencies
const express = require("express");

const bodyparser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors());

// Database connecton
const dbConnection  = require('./util/database')

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.json());
// Routes
const userRouter = require("./route/user.route");
const mainRouter = require("./route/expences.main");

// Models
const Expence = require("./model/expences.model");
const User = require("./model/user.model");

// Routes
app.use('/api/user', userRouter);
app.use('/api/main', mainRouter);

// Association
Expence.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Expence);


// To define the models in the database
(async () => {
  try {
    await dbConnection.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync models with the database
    await Expence.sync({force : true});
    await User.sync({ force : true });

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
