import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListABook() {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    condition: "",
    exchangeMode: "meetup", // Default option
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle book submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to list a book.");
        navigate("/");
        return;
      }

      // Send book details to the backend
      await axios.post(
        "/books/list",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      alert("Book listed successfully!");
      navigate("/home"); // Redirect to home after listing the book
    } catch (error) {
      console.error(error);
      alert("Failed to list the book. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>BookLives</div>
        <div style={styles.userInfo}>
          <p style={{ margin: 0, fontWeight: "bold" }}>{localStorage.getItem("username") || "Guest"}</p>
          <p style={{ margin: 0, fontSize: "0.85rem" }}>{localStorage.getItem("email") || "No email"}</p>
        </div>
        <nav style={styles.nav}>
          <a href="/home" style={styles.navLink}>Home</a>
          <a href="/list-a-book" style={styles.navLink}>List A Book</a>
          <a href="/my-books" style={styles.navLink}>My Books</a>
          <a href="/favorites" style={styles.navLink}>Favorites</a>
          <div style={styles.navSeparator}></div>
          <a href="/settings" style={styles.navLink}>Settings</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <header style={styles.logOutBox}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </header>

        <div style={styles.formContainer}>
          <h2 style={styles.header}>List Your Book</h2>
          <p style={styles.subHeader}>Fill in the details of the book</p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Book Condition</option>
              <option value="Brand New">Brand New</option>
              <option value="As Good As New">As Good As New</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>

            <div style={styles.radioGroupContainer}>
              <p style={styles.radioGroupLabel}>Mode of Exchange:</p>
              <div style={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="exchangeMode"
                    value="meetup"
                    checked={formData.exchangeMode === "meetup"}
                    onChange={handleChange}
                  />
                  Meetup
                </label>
                <label>
                  <input
                    type="radio"
                    name="exchangeMode"
                    value="postal"
                    checked={formData.exchangeMode === "postal"}
                    onChange={handleChange}
                  />
                  Postal
                </label>
              </div>
            </div>
            <button type="submit" style={styles.submitButton}>
              List Book
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#E3F2FD",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ccc",
    padding: "1rem",
  },
  radioGroupContainer: {
    marginBottom: "1rem",
    width: "300px",
  },
  radioGroupLabel: {
    margin: "0 0 0.5rem 0",
    fontSize: "0.9rem",
    color: "#666",
    textAlign: "left",
    width: "100%",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#1565C0",
  },
  userInfo: {
    marginBottom: "1rem",
    backgroundColor: "#BBDEFB",
    padding: "0.5rem",
    borderRadius: "4px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
  },
  navLink: {
    textDecoration: "none",
    color: "#1565C0",
    padding: "0.5rem 0",
    fontSize: "0.95rem",
    transition: "all 0.2s",
  },
  navSeparator: {
    height: "1px",
    backgroundColor: "#ccc",
    margin: "1rem 0",
  },
  main: {
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
  },
  logOutBox: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%", 
    marginBottom: "1rem",
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#1565C0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  formContainer: {
    textAlign: "center",
  },
  header: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
  },
  subHeader: {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.75rem",
    width: "300px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-around",
    width: "300px",
    marginBottom: "1rem",
  },
  submitButton: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#1565C0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ListABook;
