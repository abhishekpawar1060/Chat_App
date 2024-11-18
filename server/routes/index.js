const checkEmail = require("../controller/checkEmial");
const checkPassword = require("../controller/checkPassword");
const registerUser = require("../controller/registerUser");
const express = require("express");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUser = require("../controller/searchUser");

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

//update user details
router.post('/update-user', updateUserDetails);

//search user 
router.post("/search-user", searchUser);


module.exports = router;
