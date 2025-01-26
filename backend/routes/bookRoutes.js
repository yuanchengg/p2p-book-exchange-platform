const express = require("express");
const router = express.Router();
const { getBooks, searchBooks, addBook } = require("../controllers/bookController");
const authenticate = require("../middleware/authenticate"); // Middleware for authentication

// GET /books
router.get("/", getBooks);

// GET /books/search?query=Harry
router.get("/search", searchBooks);

// POST /books - Add a new book
router.post("/", authenticate, addBook);

module.exports = router;
