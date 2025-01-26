const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// SIGNUP
router.post("/signup", userController.signup);

// LOGIN
router.post("/login", userController.login);

module.exports = router;
