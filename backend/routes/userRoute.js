const express = require('express');
const { 
     userRegister,
     userLogin, 
     handleLogout, 
     getAllUsers, 
     deleteUser } = require('../controller/userController');
const { errorHandler } = require('../middleware/errorHandler');
const router = express.Router();

router.route('/register').post(errorHandler(userRegister))
router.route('/login').post(errorHandler(userLogin))
router.route('/logout').post(errorHandler(handleLogout))
router.route('/list').get(errorHandler(getAllUsers))
router.route('/delete/:id').delete(errorHandler(deleteUser))

module.exports = router