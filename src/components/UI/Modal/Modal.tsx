import React from "react";
import styles from "./modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
interface IModal {
  setIsOpen: () => void;
  children: any;
}
const Modal = ({ setIsOpen, children }: IModal) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen()} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{children}</div>

          <button className={styles.closeBtn} onClick={() => setIsOpen()}>
            <FontAwesomeIcon icon={faRemove} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
