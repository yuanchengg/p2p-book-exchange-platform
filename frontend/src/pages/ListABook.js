import React, { useEffect, useState } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    condition: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      // Grab token from local storage
      const token = localStorage.getItem("token");

      await axios.post("/books", newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Book created successfully!");
      // refresh the list
      fetchBooks();
    } catch (error) {
      console.error("Error creating book", error);
      alert("You might need to log in first!");
    }
  };

  return (
    <div>
      <h1>Available Books</h1>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} (Genre: {book.genre}, Condition: {book.condition})
          </li>
        ))}
      </ul>

      <h2>Add a New Book</h2>
      <form onSubmit={handleCreateBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Condition"
          value={newBook.condition}
          onChange={(e) =>
            setNewBook({ ...newBook, condition: e.target.value })
          }
        />
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
}

export default BookList;
