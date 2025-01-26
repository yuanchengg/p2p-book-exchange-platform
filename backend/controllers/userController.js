const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGN UP
exports.signup = async (req, res) => {
  // Destructure the fields the frontend is sending
  // e.g., { firstName, lastName, username, email, password }
  const { firstName, lastName, username, email, password } = req.body;

  try {
    // 1. Check if the user already exists by email or username
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already in use." });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the new user into your 'users' table
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, username, email`,
      [firstName, lastName, username, email, hashedPassword]
    );

    // 4. Create a JWT for the new user
    const newUser = result.rows[0];
    const token = jwt.sign(
      { userId: newUser.id, name: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Respond with success
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser.id,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find user by email
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3. Sign JWT
    const token = jwt.sign(
      { userId: user.id, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Return token + user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
