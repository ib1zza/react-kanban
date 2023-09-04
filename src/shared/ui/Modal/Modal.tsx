import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import styles from './modal.module.scss';

interface IModal {
  onClose: () => void;
  children?: ReactNode;
}
const Modal = (props: IModal) => {
    const { onClose, children } = props;
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
