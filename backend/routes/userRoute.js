const express = require('express');
const { userRegister } = require('../controller/userController');
const router = express.Router();
router.route('/register').post(userRegister)

module.exports = router