import React, { useState } from "react";

import { FirestoreBook } from "@src/firebase/bookService";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextValue {
  // AddBookModal
  openAddBookModal: boolean;
  handleOpenAddBookModal: () => void;
  handleCloseAddBookModal: () => void;

  // EditBookModal
  openEditBookModal: {
    open: boolean;
    book: FirestoreBook | null;
  };
  handleOpenEditBookModal: (book: FirestoreBook) => void;
  handleCloseEditBookModal: () => void;

  // DeleteBookModal
  openDeleteBookModal: boolean;
  handleOpenDeleteBookModal: () => void;
  handleCloseDeleteBookModal: () => void;
}

const ModalsContext = React.createContext(null as any);

export const ModalsProvider = ({ children }: ContextProps) => {
  // AddBookModal
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const handleOpenAddBookModal = () => setOpenAddBookModal(true);
  const handleCloseAddBookModal = () => setOpenAddBookModal(false);

  // EditBookModal
  const [openEditBookModal, setOpenEditBookModal] = useState<{ open: boolean; book: FirestoreBook | null }>({
    open: false,
    book: null
  });
  const handleOpenEditBookModal = (book: FirestoreBook) =>
    setOpenEditBookModal({
      open: true,
      book
    });
  const handleCloseEditBookModal = () =>
    setOpenEditBookModal({
      open: false,
      book: null
    });

  // DeleteBookModal
  const [openDeleteBookModal, setOpenDeleteBookModal] = useState(false);
  const handleOpenDeleteBookModal = () => setOpenDeleteBookModal(true);
  const handleCloseDeleteBookModal = () => setOpenDeleteBookModal(false);

  const contextValue: ContextValue = {
    openAddBookModal,
    handleOpenAddBookModal,
    handleCloseAddBookModal,

    openEditBookModal,
    handleOpenEditBookModal,
    handleCloseEditBookModal,

    openDeleteBookModal,
    handleOpenDeleteBookModal,
    handleCloseDeleteBookModal
  };

  return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};

export const useModals = (): ContextValue => {
  const context = React.useContext(ModalsContext);

  if (context === undefined) {
    throw new Error("useModals must be used within an ModalsProvider");
  }

  return context;
};
