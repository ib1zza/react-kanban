import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';

import { classNames } from '../../../lib/classNames/classNames';
import Button, { ButtonTheme } from '../../Button/Button';

interface LangSwitcherProps {
    className?: string;
    auth?: boolean
}

export const LangSwitcher = memo(({ className, auth }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            theme={auth ? ButtonTheme.FULL : ButtonTheme.CLEAR}
            className={classNames('', {}, [className as string])}
            onClick={toggle}
        >
            {t('Язык')}
        </Button>
    );
});
