import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FirestoreBook, getBooks } from "@src/firebase/bookService";

import AddEditBook from "@src/components/AddEditBook";
import DynamicIcon from "@src/components/DynamicIcon";

import "./Home.scss";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<FirestoreBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<FirestoreBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, searchQuery]);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(query);
      const authorMatch = book.author.toLowerCase().includes(query);
      const yearMatch = book.year.toString() === query;
      const genreMatch =
        Array.isArray(book.genre) &&
        book.genre.some((g) => g.toLowerCase().includes(query));

      return titleMatch || authorMatch || yearMatch || genreMatch;
    });

    setFilteredBooks(filtered);
  };

  /**
   * Scroll smoothly to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home">
      {/* ----------------- NAVBAR ----------------- */}
      <div className="navbar">
        {/* LEFT SECTION: icon + site name */}
        <div className="navbar-left">
          <DynamicIcon
            iconName="MenuBookTwoTone"
            fontSize="large"
            color="action"
            onClick={scrollToTop}    
            style={{ cursor: "pointer" }}
          />
          <span className="site-name" onClick={scrollToTop}>
            Shelfly
          </span>
        </div>

        {/* CENTER SECTION (SEARCH INPUT) */}
        <div className="navbar-center">
          <div className="input-section">
            <DynamicIcon
              iconName="SearchTwoTone"
              fontSize="medium"
              color="action"
              className="input-icon"
            />
            <input
              type="text"
              placeholder={t("common:searchBooks") ?? "Szukaj książek..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT SECTION (ICONS) */}
        <div className="navbar-right">
          <DynamicIcon iconName="BookmarkTwoTone" fontSize="large" color="action" />
          <DynamicIcon iconName="AccountCircleTwoTone" fontSize="large" color="action"/>
        </div>
      </div>
      {/* --------------- END NAVBAR --------------- */}

      {/* BOOK LISTING */}
      <div className="book-wrapper">
      <div className="book-details">
       
        {loading && <p className="loading-dots">Loading books...</p>}

        {!loading && filteredBooks.length > 0 && (
          <ul>
            {filteredBooks.map((book) => (
              <li key={book.id}>
                {/* <h4>{book.title}</h4>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Year:</strong> {book.year}
                </p>
                <p>
                  <strong>Genre:</strong>{" "}
                  {Array.isArray(book.genre) ? book.genre.join(", ") : ""}
                </p>
                <p>
                  <strong>Description:</strong> {book.description}
                </p> */}
                {book.src && <img src={book.src} alt={`${book.title}-img`} />}
              </li>
            ))}
          </ul>
        )}

        {!loading && filteredBooks.length === 0 && (
          <p>
            No books found. <img src="/images/book-covers/none.png" alt="no books" />
          </p>
        )}
      </div></div>

      {/* FORM TO ADD/EDIT BOOKS */}
      {/* <AddEditBook /> */}
    </div>
  );
};

export default Home;
