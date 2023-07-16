import React, { ReactNode } from "react";
import "./Modal.scss";
interface ModalProps {
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ children }) => {
  return <div className="Modal">{children}</div>;
};

export default Modal;
