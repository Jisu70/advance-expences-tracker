// Dependencies 
const express = require('express') ;

const app = express() ;

const cors = require('cors')

app.use(cors())

const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended : true}))

app.use(express.json())

const mainRouter = require('./route/expences.main') ;

const database = require('./model/expences.model')

app.use(mainRouter)

// To define the model in dtabase
database.sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));


// Starting the server 
  app.listen(3000, (err) => {
    if (err) throw err;
    console.log(" app listen on port 3000 ");
  });
  

