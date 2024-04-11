import React, { memo } from 'react';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'app/providers/theme/lib/useTheme';
import { Theme } from 'app/providers/theme/lib/ThemeContext';

import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ButtonTheme } from '../../Button/Button';

interface ThemeSwitcherProps{
    className?: string
    auth?: boolean
}
const ThemeSwitcher = ({ className, auth } : ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    const icon = theme === Theme.LIGHT ? (
        faSun
    ) : (
        faMoon
    );
    const icon1 = faCircleHalfStroke;

    return (
        <Button
            theme={auth ? ButtonTheme.FULL : ButtonTheme.CLEAR}
            className={classNames(
                '',
                {},
                [className as string],
            )}
            onClick={toggleTheme}
            icon={icon1}
        />
    );
};

export default memo(ThemeSwitcher);
