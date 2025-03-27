import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { deleteUserBook, FirestoreBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";

import "./DeleteBookModal.scss";
import Button from "@src/components/common/Button/Button";

interface ModalProps {
  book: FirestoreBook;
}

const DeleteBookModal = ({ book }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation(["modals", "common"]);
  const { closeModal } = useModals();

  const handleDeleteBook = async () => {
    if (!book.id || loading) return;

    setLoading(true);
    setError(null);

    try {
      await deleteUserBook(book.id);
      closeModal?.();
      alert(t("common:messages.deleteBook"));
    } catch (err: any) {
      setError(t("common:messages.errorMessages.deleteBookError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={closeModal}>
          <div className="delete-book-modal">
            <h3>{t("modals:deleteBook.title")}</h3>

            {error && <p className="error">{error}</p>}

            {loading ? (
              <p className="loading loading-dots">{t("modals:deleteBook.deletingBook")}</p>
            ) : (
              <div className="modal-actions">
                <Button variant="secondary" className="delete" onClick={handleDeleteBook}>
                  {t("modals:deleteBook.yes")}
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                  {t("modals:no")}
                </Button>
              </div>
            )}
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default DeleteBookModal;
