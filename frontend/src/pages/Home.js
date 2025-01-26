import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Helper to render star rating
function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{ color: i < rating ? "#f6c700" : "#ccc" }}>
        ★
      </span>
    );
  }
  return stars;
}

function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Retrieve stored username & email (set by login process)
  const username = localStorage.getItem("username") || "Guest";
  const userEmail = localStorage.getItem("email") || "No email";
  
  const navigate = useNavigate();

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  // Handle search button click
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/books/search?query=${searchQuery}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle listing a book button click
  const handleListABook = () => {
    navigate("/ListABook");
  };

  // Handle logout -> remove token, user info, navigate to Start.js
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

        {/* User Info (replacing the avatar) */}
        <div style={styles.userInfo}>
          <p style={{ margin: 0, fontWeight: "bold" }}>{username}</p>
          <p style={{ margin: 0, fontSize: "0.85rem" }}>{userEmail}</p>
        </div>

        <nav style={styles.nav}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#list" style={styles.navLink}>List books</a>
          <a href="#my-list" style={styles.navLink}>My listed books</a>
          <a href="#favorites" style={styles.navLink}>Favourite books</a>
          <a href="#exchanged" style={styles.navLink}>Exchanged books</a>
          <div style={styles.navSeparator}></div>
          <a href="#messages" style={styles.navLink}>Messages</a>
          <a href="#guide" style={styles.navLink}>User Guide</a>
          <a href="#settings" style={styles.navLink}>Settings</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={{ margin: 0 }}>Welcome back, {username}!</h2>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </header>

        {/* SEARCH BAR */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for a book title or author here!"
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* BOOK LIST */}
        <div style={styles.headerContainer}>
          <h3 style={styles.reccomendationsHeader}>Recommendations</h3>
          <button style={styles.listABookButton} onClick={handleListABook}>
            List A Book
          </button>
        </div>
        <div>
          {books.map((book, index) => (
            <div key={index} style={styles.bookCard}>
              <img
                src={book.image || "https://via.placeholder.com/60"}
                alt={book.title}
                style={styles.bookImage}
              />
              <div style={styles.bookInfo}>
                <div style={styles.genreTag}>{book.genre}</div>
                <h4 style={styles.bookTitle}>{book.title}</h4>
                <p style={styles.bookAuthor}>by {book.author}</p>
                <div style={styles.starRating}>
                  {renderStars(book.rating || 0)}
                </div>
                <p style={styles.listedBy}>
                  Listed by <strong>{book.listedBy || "Unknown"}</strong>
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.85rem" }}>
                  {book.listingMethod || "N/A"}
                </p>
              </div>
              <button style={styles.exchangeButton}>Exchange</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ---- STYLES (blue color scheme) ----
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',             // Vertically centers items
    marginBottom: '1rem',             // Add some spacing below the header
    width: '100%'                     // Ensure full width
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#E3F2FD", // Light blue background
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ccc",
    padding: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#1565C0", // Darker blue for contrast
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
    marginTop: "0.5rem",
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
    backgroundColor: "#fff",
    padding: "1.5rem",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  searchContainer: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  searchButton: {
    marginLeft: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#1565C0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  listABookButton: {
    marginLeft: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#1565C0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  bookCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E3F2FD", // Light blue card
    padding: "1rem",
    margin: "1rem 0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    justifyContent: "space-between",
  },
  bookImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px",
    marginRight: "1rem",
  },
  bookInfo: {
    flex: 1,
  },
  genreTag: {
    display: "inline-block",
    marginBottom: "0.25rem",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    borderRadius: "4px",
    backgroundColor: "#BBDEFB",
    color: "#555",
  },
  bookTitle: {
    margin: "0.25rem 0",
    fontSize: "1.1rem",
  },
  bookAuthor: {
    margin: 0,
    fontSize: "0.95rem",
    color: "#666",
  },
  starRating: {
    margin: "0.5rem 0",
    fontSize: "1.1rem",
  },
  listedBy: {
    margin: 0,
    fontSize: "0.85rem",
  },
  exchangeButton: {
    backgroundColor: "#90CAF9",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Home;
