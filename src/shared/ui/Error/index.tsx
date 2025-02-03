import React from 'react';
import Button from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/ui/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { getError } from 'entities/Error';
import { errorActions } from 'entities/Error/model/slice/ErrorSlice';
import s from './Error.module.scss';

const Error = () => {
    const error = useAppSelector(getError);
    const dispatch = useAppDispatch();
    const handleCloseErrorModal = () => {
        dispatch(errorActions.clearError());
    };

    const { t } = useTranslation();

    if (!error) return null;

    return (
        <Modal onClose={handleCloseErrorModal}>
            <div className={s.container}>
                <h5 className={s.title}>{t('Error occurred')}</h5>
                <p className={s.text}>{t(error)}</p>

                <div className={s.buttons}>
                    <Button className={s.delete} onClick={handleCloseErrorModal}>{t('Close')}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Error;
