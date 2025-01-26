const express = require("express");
const router = express.Router();
const { createBook, getBooks, authMiddleware } = require("../controllers/bookController");

router.post("/", authMiddleware, createBook);
router.get("/", getBooks);

module.exports = router;
