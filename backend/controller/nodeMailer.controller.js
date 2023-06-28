const nodemailer = require('nodemailer');
const User = require('../model/user.model');
const { PasswordTable } = require('../model/index')


const forgetPass = async (req, res) => {
  const email = req.body.email;
  try {
    const userdata = await User.findOne({
      where: {
        email: email
      }
    });
    if (userdata) {
      const resetRequest = await PasswordTable.create({
        UserId: userdata.id,
        isActive: true
      });
      res.status(200).json({
        success: true,
        message: "Check your mail",
      });
      sendMail(email, resetRequest.id,)
    } else {
      res.status(200).json({
        success: true,
        message: "This Email does not exist"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const sendMail = async (email, token) => {

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'reggie81@ethereal.email',
        pass: 'F7nRYsx7Dh1ra4Zefs'
      }
    });

    let message = {
      from: '"Sudipta Jana 👻" <sudipta@gmail.com>',
      to: email,
      subject: 'Password reset request ✔',
      text: 'Use this links to reset your password', 
      html: `<b>Use this link to reset your password <br> link :-<a href="http://localhost:3000/api/nodemail/reset-password?token=${token}">Click here</a></b>`,
    };

    let info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } catch (err) {
    console.log(err)
  }
};


const resetPassword = async (req, res) => {
  const token = req.query.token
  try {
    const userdata = await PasswordTable.findOne({
      where: {
        id: token,
        isActive: true
      }
    });
    if (userdata) {
     
    } else {
      res.send("user is not valide")
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


module.exports = {
  forgetPass,
  resetPassword,


};
