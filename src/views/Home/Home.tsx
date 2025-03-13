import React from "react";
import { deleteUserBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";
import { useBooks } from "@src/contexts/Books.context";

import DashboardLayout from "@src/components/layouts/DashboardLayout/DashboardLayout";
import DynamicIcon from "@src/components/common/DynamicIcon";

import "./Home.scss";
import ControlPanel from "@src/components/common/ControlPanel/ControlPanel";

const Home = () => {
  const { books, filteredBooks, loading, error } = useBooks();
  const { handleOpenEditBookModal } = useModals();

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
                  iconName="EditNote"
                  onClick={() => handleOpenEditBookModal(book)}
                  color="grey"
                />
                <DynamicIcon
                  className="dynamic-icon"
                  iconName="Delete"
                  onClick={() => handleDeleteBook(id!)}
                  color="grey"
                />
                {src && <img src={src} alt={`${title}-img`} />}
              </div>
            );
          })}
      </div>
      <div className="control-panel-wrapper">
        <ControlPanel labelName="Filter by genres" />
      </div>
    </div>
  );
};

export default (
  <DashboardLayout>
    <Home />
  </DashboardLayout>
);
