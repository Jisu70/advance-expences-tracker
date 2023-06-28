const express = require('express');
const router = express.Router();

const nodeMailerController = require('../controller/nodeMailer.controller');

router.post("/forget", nodeMailerController.forgetPass);
// router.post('/forget', nodeMailerController.forgetPass);

module.exports = router;
