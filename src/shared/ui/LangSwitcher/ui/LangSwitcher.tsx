import { useTranslation } from 'react-i18next';
import React from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import Button from '../../Button/Button';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <button
            className={classNames('', {}, [className as string])}
            onClick={toggle}
        >
            {t('Язык')}
        </button>
    );
};
