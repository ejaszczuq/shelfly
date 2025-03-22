import React from "react";
import { FirestoreBook } from "@src/firebase/bookService";

import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";

import "./BookDetailsModal.scss";

interface ModalProps {
  book: FirestoreBook;
}

const BookDetailsModal = ({ book }: ModalProps) => {
  const { closeModal } = useModals();

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={closeModal}>
          <div className="book-details-modal">
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <p>
              <b>Genre: </b>
              {book.genre}
            </p>
            <p>
              <b>Year of release:</b> {`${book.year}`}
            </p>
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default BookDetailsModal;
