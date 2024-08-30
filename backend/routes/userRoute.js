const express = require('express');
const { 
     userRegister,
     userLogin, 
     handleLogout, 
     getAllUsers, 
     deleteUser, 
     verifyOtp,
     resendOtp} = require('../controller/userController');
const { errorHandler } = require('../middleware/errorHandler');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTO');
const router = express.Router();

router.route('/register').post(errorHandler(userRegister))
router.route('/login').post(errorHandler(userLogin))
router.route('/logout').post(errorHandler(handleLogout))
router.route('/list').get(isAuthenticated,allowedTo('admin'),errorHandler(getAllUsers))
router.route('/delete/:id').delete(errorHandler(deleteUser))
router.route('/verifyOtp').post(errorHandler(verifyOtp))
router.route('/resendOtp').post(errorHandler(resendOtp))

module.exports = router