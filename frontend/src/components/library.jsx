import React, { useState, useEffect } from "react";

import "./library.css";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
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
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <h3 className="book-title">{book.book_title}</h3>
              <p className="book-author">
                Author: {book.authors_first_name} {book.authors_last_name}
              </p>
              <p className="book-genre">Genre: {book.genre}</p>
              <p className="book-pages">Pages: {book.pages}</p>
            </div>
          ))
        ) : (
          // Placeholder elements while waiting for data
          <>
            <div className="book-item placeholder">
              <h3 className="book-title">Book Title Placeholder</h3>
              <p className="book-author">Author Placeholder</p>
              <p className="book-genre">Genre Placeholder</p>
              <p className="book-pages">Pages Placeholder</p>
            </div>
            <div className="book-item placeholder">
              <h3 className="book-title">Book Title Placeholder</h3>
              <p className="book-author">Author Placeholder</p>
              <p className="book-genre">Genre Placeholder</p>
              <p className="book-pages">Pages Placeholder</p>
            </div>
            <div className="book-item placeholder">
              <h3 className="book-title">Book Title Placeholder</h3>
              <p className="book-author">Author Placeholder</p>
              <p className="book-genre">Genre Placeholder</p>
              <p className="book-pages">Pages Placeholder</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Library;
