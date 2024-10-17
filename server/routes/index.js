const checkEmail = require("../controller/checkEmial");
const checkPassword = require("../controller/checkPassword");
const registerUser = require("../controller/registerUser");
const express = require("express");

const router = express.Router();

// create new user
router.post('/register', registerUser);

//check user email
router.post('/email', checkEmail);

//check user password
router.post('/password', checkPassword);


module.exports = router;
