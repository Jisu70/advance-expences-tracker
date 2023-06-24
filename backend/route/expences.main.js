 // Dependencies
const express = require("express");

const router = express.Router();

const mainController = require("../controller/main.controller");

const checkLogin = require('../middleware/checkLogin.js')


router.get("/total-expences", checkLogin, mainController.totalExpenses);

router.post("/savedata", checkLogin, mainController.saveData);

router.get("/all-expences", checkLogin, mainController.allExpences);

router.get("/single-expences/:id", mainController.singleExpences);

router.put("/update-expences", mainController.updateExpences);

router.delete("/delete-expences", mainController.deleteExpences);

// For  a specific month
router.post("/month-expences", mainController.getExpencesByMonth);

// For specific category
router.post("/category-expences", mainController.getExpensesByCategory);

module.exports = router;
