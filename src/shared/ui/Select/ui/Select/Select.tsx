import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    MouseEventHandler, useEffect, useRef, useState,
} from 'react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { Option } from '../Option/Option';
import s from './Select.module.scss';

export interface OptionType {
    value: string | number;
    text?: string;
    heading?: string;
    image?: string;
    withAvatar?: boolean;
}

type SelectProps = {
    selected?: string | number;
    placeholder?: string;
    onChange: (selected: string | number) => void;
    onClose?: () => void;
    options: OptionType[];
    label?: string;
};

const Select = (props : SelectProps) => {
    const {
        placeholder,
        selected,
        onChange,
        onClose,
        options,
        label,
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.();
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isOpen, onClose]);

    const handleOptionClick = (value: string | number) => {
        setIsOpen(false);

        onChange(value);
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className={classNames(s.selectWrapper, { [s.open]: isOpen })}
            ref={rootRef}
            // data-is-active={isOpen}
            // data-mode={mode}
        >
            {label && (
                <label>
                    {label}
                </label>
            )}
            <div className={classNames(s.selectButton, { [s.open]: isOpen })} onClick={handlePlaceHolderClick}>
                <div
                    className={s.placeholder}
                    role="button"
                    tabIndex={0}
                >
                    {placeholder}
                </div>
                <div className={s.arrow}>
                    <MemoizedFontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>
            {isOpen && (
                <div className={s.selectArea}>
                    {
                        options.map((option) => (
                            <Option
                                onClick={handleOptionClick}
                                {...option}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export { Select };
