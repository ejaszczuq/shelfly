import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { addBook } from "@src/firebase/bookService";
import { useAuth } from "@src/contexts/Auth.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";
import Input from "@src/components/common/Input/Input";

import { generateAddEditBookSchema } from "./addBook.schema";
import "./AddBookModal.scss";

interface ModalProps {
  onClose?(): void;
}

interface AddBookForm {
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
}

const AddBookModal = ({ onClose }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const validationSchema = generateAddEditBookSchema();

  const handleAddBook = async (values: AddBookForm) => {
    if (!user) {
      setError("Musisz być zalogowany, aby dodać książkę.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addBook(values);
      onClose?.(); // Zamknięcie modala po dodaniu książki
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={onClose}>
          <Formik
            initialValues={{
              title: "",
              author: "",
              year: new Date().getFullYear(),
              genre: "",
              description: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddBook}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="add-book-modal">
                <h2>Dodaj nową książkę</h2>
                {error && <p className="error">{error}</p>}

                {/* Tytuł */}
                <Field
                  name="title"
                  label="Tytuł"
                  placeholder="Podaj tytuł"
                  prefixIcon="TextFormatTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Autor */}
                <Field
                  name="author"
                  label="Autor"
                  placeholder="Podaj autora"
                  prefixIcon="EmojiPeopleTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Rok wydania */}
                <Field
                  name="year"
                  label="Rok wydania"
                  placeholder="Podaj rok"
                  prefixIcon="InsertInvitationTwoTone"
                  type="number"
                  component={Input}
                  variant="outlined"
                />

                {/* Gatunek */}
                <Field
                  name="genre"
                  label="Gatunek"
                  placeholder="Podaj gatunek (np. Fantasy, Sci-Fi)"
                  prefixIcon="CategoryTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Opis */}
                <Field
                  name="description"
                  label="Opis"
                  placeholder="Podaj opis książki"
                  type="textarea"
                  component={Input}
                  maxLength={500}
                  variant="outlined"
                />

                {loading && <p className="loading-dots">Wysyłanie...</p>}

                <button type="submit" disabled={loading}>
                  {loading ? "Dodawanie..." : "Dodaj książkę"}
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default AddBookModal;
