const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");

// POST /users/login
router.post("/login", userController.login);

// You could add /signup as well if needed
// router.post("/signup", authController.signup);

module.exports = router;
