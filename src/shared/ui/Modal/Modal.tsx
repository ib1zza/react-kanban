import React, { ReactNode, memo } from 'react';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import s from './modal.module.scss';
import Button from '../Button/Button';
import MemoizedFontAwesomeIcon from '../MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import Element = React.JSX.Element;

interface IModal {
  onClose: () => void;
  title?: string ;
  children?: ReactNode;
}
const Modal = memo((props: IModal) => {
    const { onClose, children, title } = props;
    return (
        createPortal(
            <div>
                <div className={s.darkBG} onClick={() => onClose()} />
                <div className={s.centered}>
                    <div className={s.modal}>
                        <div className={s.header}>
                            <p>{title}</p>
                            <Button className={s.closeBtn} onClick={() => onClose()}>
                                <MemoizedFontAwesomeIcon icon={faRemove} />
                            </Button>
                        </div>
                        <div className={s.modalContent}>{children}</div>
                    </div>
                </div>
            </div>,
            document.body.querySelector('.app') as globalThis.Element,
        )
    );
});

export default Modal;
