import React, {
    InputHTMLAttributes, memo, useCallback,
} from 'react';
import s from './Input.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum InputTheme {
    WHITE = 'white',
    CLEAR = 'clear',
    PRIMARY = 'primary',
    AUTH = 'auth',
    BORDERED = 'bordered',
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
    theme?: InputTheme;
    autofocus?: boolean;
    label?: string;
    width?: string;
    error?: string;
    value?: string;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        error,
        value = '',
        onChange,
        theme = InputTheme.PRIMARY,
        type = 'text',
        placeholder,
        autofocus,
        width,
        label,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [s[theme]]: true,

    };
    return (
        <div
            style={{ width: `${width}` }}
            className={classNames(s.InputWrapper, mods, [className as string])}
        >

            {error ? (
                <p className={s.error}>
                    {error}
                </p>
            ) : (
                label && (
                    <label>
                        {label}
                    </label>
                )
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={classNames(s.input, {}, [])}
                placeholder={placeholder}
                {...otherProps}
            />

        </div>

    );
});
