import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import s from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  loading?: boolean;
  iconStyles?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    icon: Icon,
    iconStyles,
    className,
    loading,
    ...props
}) => (
    <button
        className={s.button
                 + (className ? ` ${className}` : '') + (loading ? ` ${s.loadingButton}` : '')}
        disabled={!!loading}
        {...props}
    >
        <div className={s.content + (loading ? ` ${s.invisible}` : '')}>
            {Icon && (
                <div className={s.iconContainer} style={iconStyles}>
                    {Icon}
                </div>
            )}
            {props.children}
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

export default Button;
