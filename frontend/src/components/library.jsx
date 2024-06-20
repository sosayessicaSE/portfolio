import React, { useState, useEffect } from "react";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetching books from the Flask backend
    fetch("/library")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="Library">
      <header className="Library-header">
        <h1>Library</h1>
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-item">
              <h3>{book.book_title}</h3>
              <p>Author: {book.authors_first_name} {book.authors_last_name}</p>
              <p>Genre: {book.genre}</p>
              <p>Pages: {book.pages}</p>
              <hr />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Library;
