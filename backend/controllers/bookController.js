const pool = require("../models/db");

// GET /books
exports.getBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT books.*, users.username AS listed_by
      FROM books
      JOIN users ON books.user_id = users.id
      ORDER BY books.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching books" });
  }
};

// GET /books/search
exports.searchBooks = async (req, res) => {
  const query = req.query.query || ""; // Text typed in the search bar
  try {
    // Searching by partial match in title or author
    const searchResult = await pool.query(
      `
      SELECT books.*, users.username AS listed_by
      FROM books
      JOIN users ON books.user_id = users.id
      WHERE books.title ILIKE $1
         OR books.author ILIKE $1
      ORDER BY books.id DESC
      `,
      [`%${query}%`]
    );

    res.json(searchResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error searching books" });
  }
};

// POST /books - Add a new book
exports.addBook = async (req, res) => {
  console.log("Request User:", req.user); // Debug req.user
  const { title, author, genre, condition, mode_of_exchange } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized - no user in token" });
  }

  if (!title || !author || !condition || !mode_of_exchange) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO books (title, author, genre, condition, mode_of_exchange, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `,
      [title, author, genre, condition, mode_of_exchange, userId]
    );

    console.log("Book added successfully:", result.rows[0]); // Debug success
    res.status(201).json({ message: "Book listed successfully!" });
  } catch (error) {
    console.error("Error adding book:", error); // Debug error
    res.status(500).json({ error: "Failed to add book to the database." });
  }
};

