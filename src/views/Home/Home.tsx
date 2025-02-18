import React from "react";
import { useTranslation } from "react-i18next";

import "./Home.scss";
import { books } from "@constants/books";

const Home = () => {
  const { t } = useTranslation();

  //const bookTitle = "Neon Reality";

  //const selectedBook = books.find(book => book.title === bookTitle);

  return (
    <div className="book-details">
      <h1>{t("common:home")}</h1>
      {/* {selectedBook ? (
        <>
          <h2>{selectedBook.title}</h2>
          <p><strong>Author:</strong> {selectedBook.author}</p>
          <p><strong>Description:</strong> {selectedBook.description}</p>
          <p><strong>Genres:</strong> {selectedBook.genre.join(", ")}</p>
          <img src={selectedBook.src} alt={selectedBook.title} />
        </>
      ) : (
        <h1>Book not found</h1>
      )} */}
    </div>
  );
};

export default Home;
