import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  // State for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", formData);
      const { token, user } = response.data;
      const { username, email } = user;
      // Store token for authenticated requests
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      alert("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to BookLives!</h1>
      <h2>A haven where books get a second life!</h2>

      {/* Login Instructions */}
      <p>Enter your email and password to log in.</p>

      {/* Login Form */}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.loginButton}>
          Login
        </button>
      </form>

      {/* Link to Sign Up */}
      <p>
        <Link to="/signup" style={styles.link}>
          Don’t have an account yet?
        </Link>
      </p>
    </div>
  );
}

// Basic inline styles for demonstration
const styles = {
  container: {
    textAlign: "center",
    marginTop: "2rem",
  },
  form: {
    marginTop: "1rem",
    marginBottom: "2rem",
    display: "inline-block",
    textAlign: "left",
  },
  input: {
    display: "block",
    margin: "0.5rem auto",
    padding: "0.5rem",
    width: "200px",
    fontSize: "1rem",
  },
  loginButton: {
    display: "block",
    margin: "1rem auto",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default Home;
