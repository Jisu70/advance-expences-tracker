 // Dependencies
const express = require("express");

const router = express.Router();

const mainController = require("../controller/main.controller");

const checkLogin = require('../middleware/checkLogin.js')


router.get("/total-expenses", checkLogin, mainController.totalExpenses);

router.post("/savedata", checkLogin, mainController.saveData);

router.get("/all-expenses", checkLogin, mainController.allExpenses);

router.get("/single-expenses/:id", mainController.singleExpenses);

router.put("/update-expenses", mainController.updateExpenses);

router.delete("/delete-expenses", mainController.deleteExpenses);

// For  a specific month
router.post("/month-expenses", mainController.getExpensesByMonth);

// For specific category
router.post("/category-expenses", mainController.getExpensesByCategory);

module.exports = router;
