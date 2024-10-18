const checkEmail = require("../controller/checkEmial");
const checkPassword = require("../controller/checkPassword");
const registerUser = require("../controller/registerUser");
const express = require("express");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");

const router = express.Router();

// create new user
router.post('/register', registerUser);

//check user email
router.post('/email', checkEmail);

//check user password
router.post('/password', checkPassword);

//login user details
router.get('/user-details', userDetails);

//logout user
router.get('/logout', logout);




module.exports = router;
