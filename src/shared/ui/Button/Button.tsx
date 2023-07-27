import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import s from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR= 'clear',
    FULL = 'full'
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  loading?: boolean;
  iconStyles?: React.CSSProperties;
  theme?: ButtonTheme
}

const Button: React.FC<ButtonProps> = ({
    icon: Icon,
    iconStyles,
    className,
    loading,
    theme = ButtonTheme.FULL,
    ...props
}) => {
    const mods: Record<string, boolean> = {
        [s[theme]]: true,
        [s.loading]: loading as boolean,

    };
    return (
        <button
            className={classNames(s.button, mods, [className as string])}
            disabled={loading}
            {...props}
        >
            <div className={s.content + (loading ? ` ${s.invisible}` : '')}>
                {Icon && (
                    <div className={s.icon} style={iconStyles}>
                        {Icon}
                    </div>
                )}
                {(Icon && props.children) && (
                    <div className={s.iconContainer} />
                )}
                { props.children }

            </div>
            {loading && (
                <div className={s.loading}>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible
                    />
                </div>
            )}
        </button>
    );
};

export default Button;
