const pool = require("../models/db");

// GET /books
exports.getBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT books.*, users.name AS listed_by
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

// GET /books/search?query=Harry
exports.searchBooks = async (req, res) => {
  const query = req.query.query || ""; // text typed in the search bar
  try {
    // Searching by partial match in title or author
    const searchResult = await pool.query(
      `
      SELECT books.*, users.name AS listed_by
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
