import React from "react";

import { useModals } from "@src/contexts/Modals.context";

import AddBookModal from "./AddBookModal/AddBookModal";
import EditBookModal from "./EditBookModal/EditBookModal";

const AppModals = () => {
  const {
    openAddBookModal,
    handleCloseAddBookModal,
    openEditBookModal,
    handleCloseEditBookModal,
    openDeleteBookModal,
    handleCloseDeleteBookModal
  } = useModals();

  if (openAddBookModal) return <AddBookModal onClose={handleCloseAddBookModal} />;
  if (openEditBookModal.open)
    return <EditBookModal book={openEditBookModal.book!} onClose={handleCloseEditBookModal} />;
  // if (openDeleteBookModal) return <>delete modal</>

  return <></>;
};

export default AppModals;
