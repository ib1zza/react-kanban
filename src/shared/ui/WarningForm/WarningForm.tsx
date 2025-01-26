import React from 'react';
import Button from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import s from './WarningForm.module.scss';

interface WarningFormProps {
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    text: string;
}

const WarningForm = ({
    onCancel, onConfirm, title, text,
}: WarningFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={s.container}>
            <h5 className={s.title}>{title}</h5>
            <p className={s.text}>{text}</p>

            <div className={s.buttons}>
                <Button onClick={onCancel}>{t('Cancel')}</Button>
                <Button className={s.delete} onClick={onConfirm}>{t('Delete')}</Button>
            </div>
        </div>
    );
};

export default WarningForm;
