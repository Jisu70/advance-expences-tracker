const express = require("express");
const router = express.Router();
const razorpayController = require("../controller/razorpay.controller");

router.post("/checkout", razorpayController.checkout);

module.exports = router;
