import React, { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import s from './Button.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import MemoizedFontAwesomeIcon from '../MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';

export enum ButtonTheme {
    ICON = 'iconTheme',
    WHITE = 'white',
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    CLEAR= 'clear',
    FULL = 'full',
    ACCENT = 'accent',
    NOTIFICATION = 'notification',
    PURE = 'pure'
}
export enum ButtonSize {
    S = 's',
    M = 'm',
    L = 'l'
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconDefinition;
  loading?: boolean;
  iconStyles?: React.CSSProperties;
  theme?: ButtonTheme;
  children?: React.ReactNode;
  size?: ButtonSize;
  square?: boolean;
  sharp?: boolean;
  noBorder?: boolean;
    iconColor?: string;
    layout?: boolean;
    layoutId?: string;
}

const Button: React.FC<ButtonProps> = ({
    icon: Icon,
    iconStyles,
    className,
    square,
    loading,
    size = ButtonSize.S,
    theme = ButtonTheme.CLEAR,
    children,
    sharp,
    noBorder,
    iconColor,
    layout = false,
    layoutId,
    ...props
}) => {
    const mods: Mods = {
        [s[theme]]: true,
        [s.square]: square,
        [s.loading]: loading as boolean,
        [s[size]]: true,
        [s.sharp]: sharp,
        [s.noBorder]: noBorder,
    };

    return (
    // @ts-ignore

        <motion.button
            layoutId={layoutId}
            layout={layout}
            className={classNames(s.button, mods, [className as string])}
            disabled={loading || props.disabled}
            {...props}
        >
            <div className={s.content + (loading ? ` ${s.invisible}` : '')}>
                {Icon && (
                    <div className={s.icon} style={iconStyles}>
                        <MemoizedFontAwesomeIcon
                            icon={Icon as IconDefinition}
                            style={iconColor ? { color: iconColor } : {}}
                        />
                    </div>
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
        </motion.button>
    );
};

export default memo(Button);
