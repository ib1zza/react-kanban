import React, { memo } from 'react';

import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '../../../../app/providers/theme/lib/useTheme';
import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';

import { classNames } from '../../../lib/classNames/classNames';
import Button, { ButtonTheme } from '../../Button/Button';

interface ThemeSwitcherProps{
    className?: string
    auth?: boolean
}
const ThemeSwitcher = ({ className, auth } : ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    return (
        <Button
            theme={auth ? ButtonTheme.FULL : ButtonTheme.CLEAR}
            className={classNames(
                '',
                {},
                [className as string],
            )}
            onClick={toggleTheme}
            icon={theme === Theme.LIGHT ? (
                faSun
            ) : (
                faMoon
            )}
        />
    );
};

export default memo(ThemeSwitcher);
