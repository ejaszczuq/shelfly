import React from "react";

import { FirestoreBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";
import { useBooks } from "@src/contexts/Books.context";

import DashboardLayout from "@src/components/layouts/DashboardLayout/DashboardLayout";
import DynamicIcon from "@src/components/common/DynamicIcon";

import "./Home.scss";

const Home = () => {
  const { filteredBooks, loading } = useBooks();
  const { openModal } = useModals();

  const handleOpenBookDetailsModal = (book: FirestoreBook) => openModal({ type: "bookDetails", data: { book } });
  const handleOpenEditBookModal = (book: FirestoreBook) => openModal({ type: "editBook", data: { book } });
  const handleOpenDeleteBookModal = (book: FirestoreBook) => openModal({ type: "deleteBook", data: { book } });

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
                  onClick={() => handleOpenBookDetailsModal(book)}
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
                  onClick={() => handleOpenDeleteBookModal(book)}
                  color="grey"
                />
                {src && <img src={src} alt={`${title}-img`} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default (
  <DashboardLayout>
    <Home />
  </DashboardLayout>
);
