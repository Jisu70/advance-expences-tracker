const express = require('express');
const { query, validationResult } = require('express-validator');

const router = express.Router();

const {userController} = require('../controller');
// To save the userdata
router.post('/savedata', [
  query('name').isLength({ min : 4}),
  query('email').isEmail,
  query('email').isLength({ min : 5})
], userController.saveData);
// login 
router.post('/login', userController.loginUser);

module.exports = router;
