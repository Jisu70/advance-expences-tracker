// Dependencies
const razorpay = require("razorpay");
require("dotenv").config();
const crypto = require("crypto");
const Order = require("../model/order.model");
// const Order = require('../model/order.model');
// var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');

// Instance
const razorInstance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// For create Order
const checkout = async (req, res) => {
  console.log(" UserId :", req.userId);
  const options = {
    amount: 25 * 100,
    currency: "INR",
  };
  try {
    const orders = await razorInstance.orders.create(options);
    console.log("generated OrderID: ", orders);
    return res.status(200).json({ success: true, details: orders });
  } catch (error) {
    return res.status(500).json({
      message: "Error generating orderID: " + error,
    });
  }
};
// For Verify the payment details
const verifyPayment = async (req, res) => {
  // Implementation of insert the order details to database 
  try {
    console.log(req.body);
    console.log(req.user);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_payment_id + "|" + razorpay_order_id;
    console.log("hmac body: ", body);
    console.log("hmac body type: ", typeof body);

    console.log("secret: ", process.env.RAZORPAY_API_SECRET);

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    let generatedSignature = hmac.digest("hex");

    console.log(" sig received", razorpay_signature);
    console.log(" sig generated ", generatedSignature);

    if (razorpay_signature == generatedSignature) {
      const newOrder = await Order.create({
        paymentid: razorpay_payment_id,
        orderid: razorpay_order_id,
        status: "success",
      });
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        order: newOrder,
      });
    } else {
      // Payment verification failed
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

const getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

module.exports = {
  checkout,
  verifyPayment,
  getKey,
};
