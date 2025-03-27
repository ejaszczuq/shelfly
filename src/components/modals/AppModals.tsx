import React from "react";

import { useModals } from "@src/contexts/Modals.context";

import AddBookModal from "./AddBookModal/AddBookModal";
import EditBookModal from "./EditBookModal/EditBookModal";
import BookDetailsModal from "./BookDetailsModal/BookDetailsModal";
import DeleteBookModal from "./DeleteBookModal/DeleteBookModal";
import DeleteAccountModal from "./DeleteAcountModal/DeleteAcountModal";

const AppModals = () => {
  const { modal } = useModals();

  if (!modal) return <></>;

  const { type, data } = modal;

  if (type === "addBook") return <AddBookModal />;
  if (type === "bookDetails") return <BookDetailsModal book={data.book} />;
  if (type === "editBook") return <EditBookModal book={data.book} />;
  if (type === "deleteBook") return <DeleteBookModal book={data.book} />;
  if (type === "deleteAccount") return <DeleteAccountModal />;

  return <></>;
};

export default AppModals;
