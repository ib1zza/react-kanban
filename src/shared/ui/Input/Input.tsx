import React, {
    InputHTMLAttributes, memo,
} from 'react';
import s from './Input.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum InputTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    theme?: InputTheme;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        theme = InputTheme.OUTLINE,
        type = 'text',
        placeholder,
        autofocus,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [s[theme]]: true,

    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(s.InputWrapper, mods, [className as string])}>
            {placeholder && (
                <div className={s.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={s.input}
                {...otherProps}
            />
        </div>

    );
});
