import React, { useState, useEffect } from "react";
import { FirestoreBook } from "@src/firebase/bookService";
import { useAuth } from "@src/contexts/Auth.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";

import "./BookModal.scss";

interface ModalProps {
  book: FirestoreBook;
  onClose(): void;
}

const BookModal = ({ book, onClose }: ModalProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Symulacja opóźnienia pobierania danych
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Portal>
        <Backdrop open>
          <Modal onClose={onClose}>
            <div>Ładowanie...</div>
          </Modal>
        </Backdrop>
      </Portal>
    );
  }

  if (!user) {
    return (
      <Portal>
        <Backdrop open>
          <Modal onClose={onClose}>
            <div>Użytkownik nie jest zalogowany.</div>
          </Modal>
        </Backdrop>
      </Portal>
    );
  }

  if (error) {
    return (
      <Portal>
        <Backdrop open>
          <Modal onClose={onClose}>
            <div>{error}</div>
          </Modal>
        </Backdrop>
      </Portal>
    );
  }

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={onClose}>
        <div className="book-modal">
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <p><b>Genre: </b>{book.genre}</p>
          <p><b>Year of release:</b> {`${book.year}`}</p>
        </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default BookModal;
