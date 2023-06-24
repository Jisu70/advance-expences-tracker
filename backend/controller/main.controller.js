// Dependencies
const Expences = require("../model/expences.model");
const Sequelize = require("sequelize");

// Module scaffolding
const app = {};

app.mainRoute = (req, res) => {
  res.end(" THere is Noting ");
};

// To save the Expenses in the database
app.saveData = (req, res) => {
  const userId = req.userId
  const item = req.body.item;
  const amount = req.body.amount;
  const category = req.body.category;
  Expences.create({
    item,
    amount,
    category,
    UserId: userId,
  })
    .then((result) => {
      console.log("Expenses Added");
      res.json(result);
    })
    .catch((err) => console.log(err));
};


// To get all the expences
app.allExpences = (req, res) => {
  const userId = req.userId;
  console.log("userId :", userId)
  Expences.findAll({ where : {userId :userId} })
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
  const updatedCategory = req.body.category;

  Expences.findByPk(userId)
    .then((result) => {
      if (result) {
        console.log(" this is result", result);
        result.item = updatedItem;
        result.amount = updatedAmount;
        result.category = updatedCategory;
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

// To calculate the total expenses
app.totalExpenses = (req, res) => {
 

  Expences.findAll({ where: { userId: req.userId } })
    .then((expenses) => {
      if (!expenses) {
        return res.status(404).json({ error: "Expenses not found for the provided user ID." });
      }
      return res.json(expenses);
    })
    .catch((err) => {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({ error: "Internal server error." });
    });
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

/**
 *
 * @param {*} req
 * @param {*} res
 *  Expences by month
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
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Expences by category
app.getExpensesByCategory = async (req, res) => {
  const category = req.body.category;
  console.log(category);
  try {
    const expenses = await Expences.findAll({
      where: {
        category: category,
      },
    });

    res.json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = app;

