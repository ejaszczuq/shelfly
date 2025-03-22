import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { addBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";
import Input from "@src/components/common/Input/Input";

import { generateAddEditBookSchema } from "./addBook.schema";
import "./AddBookModal.scss";

interface AddBookForm {
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
}

const AddBookModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { closeModal } = useModals();

  const validationSchema = generateAddEditBookSchema();

  const handleAddBook = async (values: AddBookForm) => {
    setLoading(true);
    setError(null);

    try {
      await addBook(values);
      closeModal?.(); // Zamknięcie modala po dodaniu książki
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
                  prefixIcon=""
                />

                {loading && <p className="loading-dots">Wysyłanie...</p>}
                {error && <p className="error">{error}</p>}

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
