import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";

import { updateUserBook, FirestoreBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";
import Input from "@src/components/common/Input/Input";

import { generateAddEditBookSchema } from "./editBook.schema";
import "./EditBookModal.scss";
import Button from "@src/components/common/Button/Button";

interface ModalProps {
  book: FirestoreBook;
}

interface EditBookFormValues {
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
}

const EditBookModal = ({ book }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation(["modals", "common"]);
  const { closeModal } = useModals();

  const validationSchema = generateAddEditBookSchema();

  // Handling book editing
  const handleSubmit = async (values: EditBookFormValues) => {
    if (!book.id || loading) return;

    setLoading(true);
    setError(null);

    try {
      await updateUserBook(book.id, values);
      closeModal();
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
        <Modal onClose={closeModal}>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true} // Updates values after downloading a book
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="edit-book-modal">
                <h2>{t("modals:editBook.title")}</h2>

                {/* Title */}
                <Field
                  name="title"
                  label={t("modals:editBook.inputs.title.label")}
                  placeholder={t("modals:editBook.inputs.title.placeholder")}
                  component={Input}
                  variant="outlined"
                  prefixIcon="TextFormatTwoTone"
                />

                {/* Author */}
                <Field
                  name="author"
                  label={t("modals:editBook.inputs.author.label")}
                  placeholder={t("modals:editBook.inputs.author.placeholder")}
                  component={Input}
                  variant="outlined"
                  prefixIcon="EmojiPeopleTwoTone"
                />

                {/* Year */}
                <Field
                  name="year"
                  type="number"
                  label={t("modals:editBook.inputs.year.label")}
                  placeholder={t("modals:editBook.inputs.year.placeholder")}
                  component={Input}
                  variant="outlined"
                  prefixIcon="InsertInvitationTwoTone"
                />

                {/* Genre */}
                <Field
                  name="genre"
                  label={t("modals:editBook.inputs.genre.label")}
                  placeholder={t("modals:editBook.inputs.genre.placeholder")}
                  component={Input}
                  variant="outlined"
                  prefixIcon="CategoryTwoTone"
                />

                {/* Description */}
                <Field
                  name="description"
                  label={t("modals:editBook.inputs.description.label")}
                  placeholder={t("modals:editBook.inputs.description.placeholder")}
                  component={Input}
                  type="textarea"
                  maxLength={500}
                  variant="outlined"
                />

                {error && <p className="error">{error}</p>}

                <Button variant="primary-with-arrow" type="submit" disabled={loading}>
                  {loading ? <span className="loading-dots">{t("common:saving")}</span> : t("common:save")}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default EditBookModal;
