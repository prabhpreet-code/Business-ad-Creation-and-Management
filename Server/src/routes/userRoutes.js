const express = require("express");
const {
  registerUserData,
  loginUserData,
} = require("../controllers/userController");
const router = express.Router();

router
  .route("/signin")
  //post user data
  .post(registerUserData);

router
  .route("/login")
  //post user data
  .post(loginUserData);

module.exports = router;
