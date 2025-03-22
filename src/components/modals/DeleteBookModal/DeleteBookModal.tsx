import React, { useState } from "react";

import { deleteUserBook, FirestoreBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";

import "./DeleteBookModal.scss";

interface ModalProps {
  book: FirestoreBook;
}

const DeleteBookModal = ({ book }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { closeModal } = useModals();

  const handleDeleteBook = async () => {
    if (!book.id) return;

    setLoading(true);
    setError(null);

    try {
      await deleteUserBook(book.id);
      closeModal?.();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={closeModal}>
          <div className="delete-book-modal">
            <h3>Czy na pewno chcesz usunąć książkę?</h3>
            {error && <p className="error">{error}</p>}

            {loading ? (
              <p className="loading">Usuwanie ksiązki...</p>
            ) : (
              <div className="modal-actions">
                <button className="modal-btn delete" onClick={handleDeleteBook}>
                  Tak, usuń książkę
                </button>
                <button className="modal-btn" onClick={closeModal}>
                  Nie, anuluj
                </button>
              </div>
            )}
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default DeleteBookModal;
