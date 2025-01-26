const express = require("express");
const router = express.Router();
const { getBooks, searchBooks } = require("../controllers/bookController");

// GET /books
router.get("/", getBooks);

// GET /books/search?query=Harry
router.get("/search", searchBooks);

module.exports = router;
