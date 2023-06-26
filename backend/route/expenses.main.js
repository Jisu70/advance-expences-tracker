 // Dependencies
const express = require("express");

const router = express.Router();

const mainController = require("../controller/main.controller");

const checkLogin = require('../middleware/checkLogin.js')


router.get("/total-expenses", checkLogin, mainController.totalExpenses);

router.post("/savedata", checkLogin, mainController.saveData);

router.get("/all-expenses", checkLogin, mainController.allExpenses);

router.get("/single-user/", checkLogin, mainController.findeUser);

router.put("/update-expenses", mainController.updateExpenses);

router.delete("/delete-expenses", mainController.deleteExpenses);

// For  a specific month
router.post("/month-expenses", mainController.getExpensesByMonth);

// For specific category
router.post("/category-expenses", mainController.getExpensesByCategory)
;
// To show everyone total expences 
router.get("/lead-board", mainController.allUserTotalExpenses);

module.exports = router;
