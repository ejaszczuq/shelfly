import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { updateUserBook, FirestoreBook } from "@src/firebase/bookService";
import { useAuth } from "@src/contexts/Auth.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";
import Input from "@src/components/common/Input/Input";

import { generateAddEditBookSchema } from "./editBook.schema";
import "./EditBookModal.scss";

interface ModalProps {
  book: FirestoreBook;
  onClose(): void;
}

interface EditBookForm {
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
}

const EditBookModal = ({ book, onClose }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const validationSchema = generateAddEditBookSchema();

  // Obsługa edycji książki
  const handleSubmit = async (values: EditBookForm) => {
    if (!user) {
      setError("Musisz być zalogowany, aby edytować książkę.");
      return;
    }

    if (!book.id) return;

    setLoading(true);
    setError(null);

    try {
      await updateUserBook(book.id, values);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    description: book.description
  };

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={onClose}>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true} // Aktualizuje wartości po pobraniu książki
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="edit-book-modal">
                <h2>Edytuj książkę</h2>
                {error && <p className="error">{error}</p>}

                {/* Tytuł */}
                <Field name="title" label="Tytuł" component={Input} variant="outlined" prefixIcon="TextFormatTwoTone"/>

                {/* Autor */}
                <Field name="author" label="Autor" component={Input} variant="outlined" prefixIcon="EmojiPeopleTwoTone"/>

                {/* Rok wydania */}
                <Field name="year" label="Rok wydania" type="number" component={Input} variant="outlined" prefixIcon="InsertInvitationTwoTone"/>

                {/* Gatunek */}
                <Field name="genre" label="Gatunek" component={Input} variant="outlined" prefixIcon="CategoryTwoTone"/>

                {/* Opis */}
                <Field
                  name="description"
                  label="Opis"
                  component={Input}
                  type="textarea"
                  maxLength={500}
                  variant="outlined"
                />

                {loading && <p className="loading-dots">Zapisywanie...</p>}

                <button type="submit" disabled={loading}>
                  {loading ? "Zapisywanie..." : "Zapisz zmiany"}
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default EditBookModal;
