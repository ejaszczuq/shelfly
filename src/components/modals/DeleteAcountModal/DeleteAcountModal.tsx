import React, { useState } from "react";
import { useAuth } from "@src/contexts/Auth.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";

import "./DeleteAcountModal.scss";

interface DeleteAccountModalProps {
  onClose(): void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { deleteAccount } = useAuth();  

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteAccount(); 
      onClose(); 
      alert("Twoje konto zostało usunięte.");
    } catch (err: any) {
      setError("Wystąpił błąd przy usuwaniu konta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={onClose}>
          <div className="delete-account-modal">
            <h3>Czy na pewno chcesz usunąć swoje konto?</h3>
            {error && <p className="error">{error}</p>}

            {loading ? (
              <p className="loading">Usuwanie konta...</p>
            ) : (
              <div className="modal-actions">
                <button className="modal-btn delete" onClick={handleDeleteAccount}>
                  Tak, usuń konto
                </button>
                <button className="modal-btn" onClick={onClose}>
                  Nie, anuluj
                </button>
              </div>
            )}
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default DeleteAccountModal;
