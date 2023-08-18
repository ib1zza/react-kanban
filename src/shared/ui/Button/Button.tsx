import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import s from './Button.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

export enum ButtonTheme {
    CLEAR= 'clear',
    FULL = 'full'
}
export enum ButtonSize {
    S = 's',
    M = 'm',
    L = 'l'
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  loading?: boolean;
  iconStyles?: React.CSSProperties;
  theme?: ButtonTheme;
  children?: React.ReactNode;
  size?: ButtonSize;
  square?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    icon: Icon,
    iconStyles,
    className,
    square,
    loading,
    size = ButtonSize.S,
    theme = ButtonTheme.FULL,
    children,
    ...props
}) => {
    const mods: Mods = {
        [s[theme]]: true,
        [s.square]: square,
        [s.loading]: loading as boolean,
        [s[size]]: true,
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
                {(Icon && children) && (
                    <div className={s.iconContainer} />
                )}
                { children }
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
