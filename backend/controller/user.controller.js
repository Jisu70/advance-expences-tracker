const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const saveData = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup was successful!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred during signup.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        res.status(200).json({
          message: "Authentication successful!",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed! Invalid password.",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed! User not found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred during authentication.",
    });
  }
};

module.exports = {
  saveData,
  loginUser,
};
