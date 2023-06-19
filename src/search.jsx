import { useState, useEffect, useRef } from "react";
import "./app.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm: query, source: "google" }), // Pass source as "google"
        });

        if (!response.ok) {
          throw new Error("Failed to retrieve search results");
        }

        const data = await response.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      fetchBooks();
    }
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(query);
    setQuery("");
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>

      <div className="card-container ">
        {books.map((book, index) => (
          <div className="card grid-item" key={index}>
            <p className="title">Title: {book.title || "N/A"}</p>
            <p className="title">Author: {book.author || "N/A"}</p>
            <img src={book.cover_image} className="thumbnail" alt="Thumbnail" />
            <p>Price: {book.price}</p>
            <p className="description">
              Description: {book.description.slice(0, 100) + "...." || "N/A"}
            </p>
            <p>Customer Rating: {book.customer_ratings || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
