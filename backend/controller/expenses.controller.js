
// Dependencies
const { Expense } = require("../model");
const User = require("../model/user.model");
const Sequelize = require("../config/database");
const { uploadToS3 } = require("../services/s3services");
const { Urltable } = require('../model/index')

// To save the Expenses in the database
const saveData = async (req, res) => {
  try {
    const userId = req.userId;
    const item = req.body.item;
    const amount = req.body.amount;
    const category = req.body.category;

    const result = await Expense.create({
      item: item,
      amount: amount,
      category: category,
      UserId: userId,
    });

    res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

// To get all the expenses
const allExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId :", userId);
    let result = await Expense.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

// TO fetch all the expenses
const allUserTotalExpenses = async (req, res) => {
  try {
    const reponse = await User.findAll()
    res.status(200).json({ result: reponse })
  } catch (error) {
    console.log(err)
    res.status(400).json({ message: "Error fetching Expenses" })
  }

};

// To edit or update the expenses
const updateExpenses = async (req, res) => {
  const userId = req.body.id;
  const updatedItem = req.body.item;
  const updatedAmount = req.body.amount;
  const updatedCategory = req.body.category;
  try {
    const result = await Expense.findByPk(userId);
    if (result) {
      result.item = updatedItem;
      result.amount = updatedAmount;
      result.category = updatedCategory;
      await result.save();
      res.status(200).json({ message: "Expenses updated successfully." });
    } else {
      throw new Error("Cannot edit");
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
};

// To calculate the total expenses
const totalExpenses = async (req, res) => {
  try {
    const result = await Expense.findAll({ where: { userId: req.userId } })
    if (result) {
      res.status(200).json({ result: result });
    } else {
      res.status(404).json({ error: "Expenses not found for the provided user ID." });
    }
  }
  catch (err) {
    console.error("Error fetching expenses:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// To find the user by their ID
const findUser = (req, res) => {
  const id = req.userId;
  User.findByPk(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

// To delete the expenses
const deleteExpenses = async (req, res) => {
  const id = req.body.id;
  try {
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found." });
    }
    await expense.destroy();
    console.log("Item DESTROYED");
    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred." });
  }
};

// Is user premium
const isPremium = async (req, res) => {
  let id = req.userId;
  try {
    const result = await User.findByPk(id, {
      attributes: ['isPremium'] 
    });
    console.log(result)
    res.status(200).json({ result: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};


// 
const perUserTotal = async (req, res) => {
  try {
    // Groupby technic
    const expenses = await Expense.findAll({
      attributes: [
        "UserId",
        [Sequelize.fn("sum", Sequelize.col("amount")), "total_cost"],
      ],
      group: ["UserId"],
    });
    res.send(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to fetch expenses month-wise and date-wise
const getExpensesByMonthAndDate = async (req, res) => {
  console.log("i called");
  try {
    const expenses = await Expense.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "date"],
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "totalamount"],
      ],
      group: [
        Sequelize.fn("DATE", Sequelize.col("createdAt")),
        Sequelize.fn("MONTH", Sequelize.col("createdAt")),
      ],
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    throw error;
  }
};
//

const downloadExpenses = async (req, res) => {
  try {
    const id = req.userId;
    const result = await Expense.findAll({ id });
    const stringifyResult = JSON.stringify(result);
    const fileName = `Expense${new Date()}.txt`;
    const url = await uploadToS3(stringifyResult, fileName);
    console.log(url);
    const response = await Urltable.create({
      url: url,
      UserId: id
    })
    console.log(response)
    res.status(200).json({ success: true, URL: url });
  } catch (error) {
    res.status(500).json({ error });
  }
};


const usersAllExpenseslink = async (req, res) => {
  try {
    const id = req.userId;
    const result = await Urltable.findAll({ where: { UserId: id } });
    res.status(200).json({ result })
  } catch (error) {
    res.status(500).json({ error });

  }
}
const pagination = async (req, res) => {
  try {
    const id = req.userId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // Fetch the data from the database with pagination
    const result = await Expense.findAndCountAll({
      where: {
        userId: id,
      },
      limit,
      offset,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}


module.exports = {
  saveData,
  allExpenses,
  allUserTotalExpenses,
  updateExpenses,
  totalExpenses,
  deleteExpenses,
  isPremium,
  perUserTotal,
  getExpensesByMonthAndDate,
  downloadExpenses,
  findUser,
  usersAllExpenseslink,
  pagination
};
