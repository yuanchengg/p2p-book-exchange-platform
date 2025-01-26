import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  // State to store fetched books
  const [books, setBooks] = useState([]);

  // State for search query input
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        setBooks(res.data); // Store books in state
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

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>book loop</div>
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
        <div style={styles.userProfile}>
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            style={styles.avatar}
          />
          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>bookworm</p>
            <p style={{ margin: 0, fontSize: "0.8rem" }}>bw@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={{ margin: 0 }}>Welcome back bookworm!</h2>
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
        <h3 style={{ marginTop: "1rem" }}>List of books</h3>
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

// Helper to render star rating
function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    // filled star if i < rating
    stars.push(
      <span key={i} style={{ color: i < rating ? "#f6c700" : "#ccc" }}>
        ★
      </span>
    );
  }
  return stars;
}

// Inline styling
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#f8f8f8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #ccc",
    padding: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#7e57c2",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    padding: "0.5rem 0",
    fontSize: "0.95rem",
    transition: "all 0.2s",
  },
  navSeparator: {
    height: "1px",
    backgroundColor: "#ccc",
    margin: "1rem 0",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  },
  avatar: {
    borderRadius: "50%",
    marginRight: "0.5rem",
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
    backgroundColor: "#7e57c2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  bookCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#eceff1",
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
    backgroundColor: "#c8e6c9",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Home;
