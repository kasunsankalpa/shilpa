const express = require('express');
const router = express.Router();
const User = require('../controller/User/User');


router.post("/GetUsername", User.Getusername);
router.post("/SaveStd", User.SaveUser);
router.post("/Getuserdata",User.Getusrdata);

module.exports = router;