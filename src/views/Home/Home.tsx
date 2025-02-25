import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FirestoreBook, getBooks } from "@src/firebase/bookService";

import "./Home.scss";

const Home = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<FirestoreBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const fetchBooks = await getBooks();
      console.log(" fetchBooks ~ fetchBooks:", fetchBooks);
      setBooks(fetchBooks);
    } catch (error) {
      console.error("Error fetching books: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-details">
      <h1>{t("common:home")}</h1>

      {loading && <p className="loading-dots">Loading books</p>}

      {!loading && books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Year:</strong> {book.year}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!loading && books.length <= 0 && <p>No books found.</p>}

      {/* {loading ? (
        <p>Loading books...</p>
      ) : books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Year:</strong> {book.year}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>
      )} */}
    </div>
  );
};
export default Home;
