import React, {
    InputHTMLAttributes, memo, useCallback, useState,
} from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
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

    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const handleShowPass = () => {
        setIsShowingPassword((prev) => !prev);
    };

    // eslint-disable-next-line no-nested-ternary
    const typeToShow = type === 'password' ? (isShowingPassword ? 'text' : 'password') : type;
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
                type={typeToShow}
                value={value}
                onChange={onChange}
                className={classNames(s.input, {}, [])}
                placeholder={placeholder}
                {...otherProps}
            />

            {
                type === 'password' && !!value.length && (
                    <button className={s.showPass} type="button" onClick={handleShowPass}>
                        {/* <FontAwesomeIcon icon={faEye} /> */}
                        <MemoizedFontAwesomeIcon icon={isShowingPassword ? faEyeSlash : faEye} />
                    </button>
                )
            }

        </div>

    );
});
