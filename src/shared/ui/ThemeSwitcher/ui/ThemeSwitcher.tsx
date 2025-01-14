import React, { memo } from 'react';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'app/providers/theme/lib/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';
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
            icon={faCircleHalfStroke}
        />
    );
};

export default memo(ThemeSwitcher);
