import React from 'react';
import Button from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import s from './Error.module.scss';

interface WarningFormProps {
    onConfirm: () => void;
    text: string;
}

const Error = ({
    onConfirm, text,
}: WarningFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={s.container}>
            <h5 className={s.title}>{t('Error occurred')}</h5>
            <p className={s.text}>{t(text)}</p>

            <div className={s.buttons}>
                <Button className={s.delete} onClick={onConfirm}>{t('Close')}</Button>
            </div>
        </div>
    );
};

export default Error;
