 // Dependencies
const express = require("express");

const router = express.Router();

const mainController = require("../controller/main.controller");

router.get("/total-expences", mainController.totalExpences);

router.post("/savedata", mainController.saveData);

router.get("/all-expences", mainController.allExpences);

router.get("/single-expences/:id", mainController.singleExpences);

router.put("/update-expences", mainController.updateExpences);

router.delete("/delete-expences", mainController.deleteExpences);

// For  a specific month
router.post("/month-expences", mainController.getExpencesByMonth);

// For specific category
router.post("/category-expences", mainController.getExpensesByCategory);

module.exports = router;
