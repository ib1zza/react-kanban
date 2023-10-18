import React, { ReactNode, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import s from './modal.module.scss';
import Button from '../Button/Button';

interface IModal {
  onClose: () => void;
  title?: string ;
  children?: ReactNode;
}
const Modal = memo((props: IModal) => {
    const { onClose, children, title } = props;
    return (
        <>
            <div className={s.darkBG} onClick={() => onClose()} />
            <div className={s.centered}>
                <div className={s.modal}>
                    <div className={s.header}>
                        <p>{title}</p>
                        <Button className={s.closeBtn} onClick={() => onClose()}>
                            <FontAwesomeIcon icon={faRemove} />
                        </Button>
                    </div>

                    <div className={s.modalContent}>{children}</div>

                </div>
            </div>
        </>
    );
});

export default Modal;
