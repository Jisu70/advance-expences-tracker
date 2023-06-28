const nodemailer = require('nodemailer');

const forgetPass = async (req, res) => {
  const email = req.body.email 
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
      from: '"Sudipta Jana 👻" <sudiptajana70@gmail.com>', // sender address
      to: email,
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    };

    let info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
    res.status(201).json({ message: 'Mail has been sent', info });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// const forgetPass = (req, res) => {
//   // Add your code for the forget password functionality
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       auth: {
//         user: 'reggie81@ethereal.email',
//         pass: 'F7nRYsx7Dh1ra4Zefs'
//       }
//     }); 
//   } catch (error) {
    
//   }
// };

module.exports = {
  forgetPass,
  // forgetPass
};
