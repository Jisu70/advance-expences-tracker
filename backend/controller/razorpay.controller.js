const razorpay = require('razorpay');
require('dotenv').config();


const razorInstance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});


//  Create payment 
const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try {
    const order = await razorInstance.orders.create(options);
    console.log(order);
    res.status(200).json({ success: true, details: order });
  } catch (err) {
    console.log(err);
    res.status(500).send('Failed to create payment order');
  }
};

const verifyPayment = (req, res) => {

}


module.exports ={ checkout
}