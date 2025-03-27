import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";

import { addBook } from "@src/firebase/bookService";
import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";
import Input from "@src/components/common/Input/Input";

import { generateAddEditBookSchema } from "./addBook.schema";
import "./AddBookModal.scss";
import Button from "@src/components/common/Button/Button";

interface AddBookFormValues {
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
}

const AddBookModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation(["modals", "common"]);
  const { closeModal } = useModals();

  const validationSchema = generateAddEditBookSchema();

  const handleAddBook = async (values: AddBookFormValues) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      await addBook(values);
      closeModal?.(); // Closing the modal after adding a book
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
                <h2>{t("modals:addBook.title")}</h2>

                {/* Title */}
                <Field
                  name="title"
                  label={t("modals:inputs.title.label")}
                  placeholder={t("modals:inputs.title.placeholder")}
                  prefixIcon="TextFormatTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Author */}
                <Field
                  name="author"
                  label={t("modals:inputs.author.label")}
                  placeholder={t("modals:inputs.author.placeholder")}
                  prefixIcon="EmojiPeopleTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Year */}
                <Field
                  name="year"
                  type="number"
                  label={t("modals:inputs.year.label")}
                  placeholder={t("modals:inputs.year.placeholder")}
                  prefixIcon="InsertInvitationTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Genre */}
                <Field
                  name="genre"
                  label={t("modals:inputs.genre.label")}
                  placeholder={t("modals:inputs.genre.placeholder")}
                  prefixIcon="CategoryTwoTone"
                  component={Input}
                  variant="outlined"
                />

                {/* Description */}
                <Field
                  name="description"
                  label={t("modals:inputs.description.label")}
                  placeholder={t("modals:inputs.description.placeholder")}
                  type="textarea"
                  component={Input}
                  maxLength={500}
                  variant="outlined"
                  prefixIcon=""
                />

                {error && <p className="error">{error}</p>}

                <Button variant="primary-with-arrow" type="submit" disabled={loading}>
                  {loading ? <span className="loading-dots">{t("common:saving")}</span> : t("common:addBook")}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default AddBookModal;
