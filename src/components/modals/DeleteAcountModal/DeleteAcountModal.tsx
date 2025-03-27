import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";
import { useModals } from "@src/contexts/Modals.context";

import Portal from "@src/components/modals/shared/Portal/Portal";
import Backdrop from "@src/components/modals/shared/Backdrop/Backdrop";
import Modal from "@src/components/modals/shared/Modal/Modal";

import "./DeleteAcountModal.scss";
import { useTranslation } from "react-i18next";
import Button from "@src/components/common/Button/Button";

const DeleteAccountModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { deleteAccount } = useAuth();
  const { closeModal } = useModals();
  const { t } = useTranslation(["modals", "common"]);

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteAccount();
      closeModal();
      alert(t("common:messages.deleteAccount"));
      navigate(PATHS.authLogin.path);
    } catch (err: any) {
      setError(t("common:messages.errorMessages.deleteAccountError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Backdrop open>
        <Modal onClose={closeModal}>
          <div className="delete-account-modal">
          <h4>{t("modals:deleteAccount.title")}</h4>
            {error && <p className="error">{error}</p>}

            {loading ? (
              <p className="loading-dots">{t("modals:deleteAccount.deletingAccount")}</p>
            ) : (
              <div className="modal-actions">
                <Button className="delete" onClick={handleDeleteAccount} variant={"secondary"}>
                {t("modals:deleteAccount.yes")}
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                {t("modals:no")}
                </Button>
              </div>
            )}
          </div>
        </Modal>
      </Backdrop>
    </Portal>
  );
};

export default DeleteAccountModal;
