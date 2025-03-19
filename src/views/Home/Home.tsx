import React from "react";
import { deleteUserBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";
import { useBooks } from "@src/contexts/Books.context";

import DashboardLayout from "@src/components/layouts/DashboardLayout/DashboardLayout";
import DynamicIcon from "@src/components/common/DynamicIcon";

import "./Home.scss";
import BookModal from "@src/components/modals/BookModal/BookModal";

const Home = () => {
  const { filteredBooks, loading } = useBooks();
  const {
    handleOpenEditBookModal,
    handleOpenBookModal,
    openBookModal,
    selectedBook,
    handleCloseBookModal,
  } = useModals();

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteUserBook(bookId);
    } catch (error) {
      console.error("Błąd usuwania książki:", error);
    }
  };

  return (
    <div className="home">
      <div className="book-wrapper">
        {loading && <p>Ładowanie książek...</p>}
        {!loading && filteredBooks.length === 0 && <p>Brak książek do wyświetlenia.</p>}
        {!loading &&
          filteredBooks.map((book) => {
            const { id, title, src } = book;
            return (
              <div key={id} className="book-details">
                <h4>{title}</h4>
                <DynamicIcon
                  className="dynamic-icon"
                  iconName="ContactSupportTwoTone"
                  color="grey"
                  onClick={() => handleOpenBookModal(book)}
                />
                <DynamicIcon
                  className="dynamic-icon"
                  iconName="EditNoteTwoTone"
                  onClick={() => handleOpenEditBookModal(book)}
                  color="grey"
                />
                <DynamicIcon
                  className="dynamic-icon delete"
                  iconName="DeleteTwoTone"
                  onClick={() => handleDeleteBook(id!)}
                  color="grey"
                />
                {src && <img src={src} alt={`${title}-img`} />}
              </div>
            );
          })}
      </div>
      {openBookModal && selectedBook && (
        <BookModal book={selectedBook} onClose={handleCloseBookModal} />
      )}
    </div>
  );
};

export default (
  <DashboardLayout>
    <Home />
  </DashboardLayout>
);
