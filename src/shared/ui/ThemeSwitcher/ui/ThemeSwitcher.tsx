import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            // square
            theme={auth ? ButtonTheme.FULL : ButtonTheme.CLEAR}
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

export default memo(ThemeSwitcher);
