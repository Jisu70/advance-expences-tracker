// Dependencies
const Expences = require("../model/expences.model");
const Sequelize = require("sequelize");

// Module scaffolding
const app = {};

app.mainRoute = (req, res) => {
  res.end();
};

// To save the Expences in database
app.saveData = (req, res) => {
  const item = req.body.item;
  const amount = req.body.amount;
  Expences.create({
    item,
    amount,
  })
    .then((result) => {
      console.log(" Expences Added ");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

// To get all the expences
app.allExpences = (req, res) => {
  Expences.findAll()
    .then((exp) => {
      res.send(exp);
    })
    .catch((err) => console.error("Error fetching Expences:", err));
};

// To edit or update the expences
app.updateExpences = (req, res) => {
  const userId = req.body.id;
  const updatedItem = req.body.item;
  const updatedAmount = req.body.amount;

  Expences.findByPk(userId)
    .then((result) => {
      if (result) {
        console.log(" this is result", result);
        result.item = updatedItem;
        result.amount = updatedAmount;
        return result.save();
      } else {
        throw new Error("Cannot not edit");
      }
    })
    .then((result) => {
      console.log("Expences updated:", result);
      res.json({ message: "Expences updated successfully." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred." });
    });
};

// To calculate the total expences
app.totalExpences = (req, res) => {
  Expences.findAll()
    .then((exp) => {
      return res.send(exp);
    })
    .catch((err) => console.error("Error fetching Expences:", err));
};

app.singleExpences = (req, res) => {
  const id = req.params.id;
  Expences.findByPk(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

// To delete th expences
app.deleteExpences = (req, res) => {
  const id = req.body.id;
  Expences.findByPk(id)
    .then((item) => {
      if (item) {
        return item.destroy();
      } else {
        throw new Error("Item not found");
      }
    })
    .then(() => {
      console.log("Item DESTROYED");
      res.json({ message: "Item deleted successfully." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred." });
    });
};

// Expences by month 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
app.getExpencesByMonth = async (req, res) => {
  const month = req.body.month;
  console.log(month);
  try {
    const expenses = await Expences.findAll({
      where: Sequelize.literal(`MONTH(createdAt) = ${month}`),
    });

    res.json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = app;


// const expenses = await Expenses.findAll({
//   where: sequelize.literal(`MONTH(createdAt) = ${month}`),
// });
