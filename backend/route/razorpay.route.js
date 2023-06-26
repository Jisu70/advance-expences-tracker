const express = require("express");
const router = express.Router();
const razorpayController = require("../controller/razorpay.controller");
const checkLogin = require("../middleware/checkLogin");

router.post("/checkout", checkLogin, razorpayController.checkout);

router.post("/verify", razorpayController.verifyPayment);

router.get("/key", razorpayController.getKey);

module.exports = router;
