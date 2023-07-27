import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '../../../../app/providers/theme/lib/useTheme';
import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';

import { classNames } from '../../../lib/classNames/classNames';
import Button, { ButtonTheme } from '../../Button/Button';

interface ThemeSwitcherProps{
    className?: string
}
const ThemeSwitcher = ({ className } : ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();
    return (
        <Button
            className={classNames(
                '',
                {},
                [className as string],
            )}
            onClick={toggleTheme}
        >
            {theme === Theme.LIGHT ? (
                <FontAwesomeIcon icon={faSun} />
            ) : (
                <FontAwesomeIcon icon={faMoon} />
            )}
        </Button>
    );
};

export default ThemeSwitcher;
