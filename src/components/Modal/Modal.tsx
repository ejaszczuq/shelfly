import React, { useEffect } from "react";

import useBlockScroll from "@hooks/useBlockScroll";
import useClickKey from "@hooks/useClickKey";
import DynamicIcon from "../DynamicIcon";

import "./Modal.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const { lock, unlock } = useBlockScroll();

  const handleClose = () => {
    onClose?.();
  };

  useClickKey("Escape", handleClose);

  useEffect(() => {
    lock();

    return () => {
      unlock();
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">{children}</div>

      {onClose && (
        <DynamicIcon iconName="DisabledByDefaultTwoTone" color="action" onClick={onClose} className="modal-close-btn" />
      )}
    </div>
  );
};

export default Modal;
