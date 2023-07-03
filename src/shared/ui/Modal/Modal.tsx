import React, {FC} from "react";
import styles from "./modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

interface IModal {
  onClose: () => void;
  children: React.ReactNode;
}
const Modal:FC<IModal> = ({ onClose, children }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => onClose()} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{children}</div>

          <button className={styles.closeBtn} onClick={() => onClose()}>
            <FontAwesomeIcon icon={faRemove} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
