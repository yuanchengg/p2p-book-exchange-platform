const pool = require("../models/db");
const jwt = require("jsonwebtoken");

// Middleware to verify token
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(403).json({ error: "No token provided" });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

exports.authMiddleware = authMiddleware;

exports.createBook = async (req, res) => {
  const { title, author, genre, condition } = req.body;
  const userId = req.userId; // Provided by authMiddleware

  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, genre, condition, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, genre, condition, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating book" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching books" });
  }
};
