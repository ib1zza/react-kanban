import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import Button from '../../Button/Button';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames('', {}, [className as string])}
            onClick={toggle}
        >
            {t('Язык')}
        </Button>
    );
});
