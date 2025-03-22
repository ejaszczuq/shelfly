import React, { useState } from "react";
import { FirestoreBook } from "@src/firebase/bookService";

interface ContextProps {
  children: React.ReactNode;
}

interface BookModal {
  type: "bookDetails" | "editBook" | "deleteBook";
  data: {
    book: FirestoreBook;
  };
}

interface WithoutObjectModal {
  type: "addBook" | "deleteAccount";
  data?: null;
}

export type AppModal = BookModal | WithoutObjectModal;

interface ContextValue {
  modal: AppModal | null;
  openModal: (modal: AppModal) => void;
  closeModal: () => void;
}

const ModalsContext = React.createContext<ContextValue>(null as any);

export const ModalsProvider = ({ children }: ContextProps) => {
  const [modal, setModal] = useState<AppModal | null>(null);

  const openModal = (modal: AppModal) => setModal(modal);
  const closeModal = () => setModal(null);

  const contextValue: ContextValue = {
    modal,
    openModal,
    closeModal
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

export default ModalsContext;
