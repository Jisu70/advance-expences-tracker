const express = require("express");
const router = express.Router();
const  checkout = require("../controller/razorpay.controller");


router.post('/checkout', checkout)


module.exports = router ;