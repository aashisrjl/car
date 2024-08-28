const express = require('express');
const { errorHandler } = require('../middleware/errorHandler');
const { createKyc, verifyKyc, getAllKyc } = require('../controller/kycController');
const { upload } = require('../middleware/multerConfig');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTO');
const router = express.Router(); 

router.route("/submit/").post(isAuthenticated,upload.single('file'),errorHandler(createKyc))
router.route("/verify/:kycId").post(isAuthenticated,allowedTo('admin'),errorHandler(verifyKyc))
router.route("/getAllKyc/").get(isAuthenticated,allowedTo('admin'),errorHandler(getAllKyc))

module.exports = router