import { Avatar, AvatarSize } from 'shared/ui/Avatar';
import { OptionType } from 'shared/ui/Select';
import { memo, useCallback } from 'react';
import s from './Option.module.scss';

interface OptionProps extends OptionType {
    onClick: (value: string | number) => void;
}

const Option = memo((props: OptionProps) => {
    const {
        heading,
        value,
        text,
        image,
        onClick,
        withAvatar,
    } = props;

    const handleClick = useCallback((clickedValue: string | number) => {
        onClick(clickedValue);
    }, [onClick]);

    return (
        <div
            className={s.option}
            onClick={() => handleClick(value)}
        >
            {(image || withAvatar)
                && <Avatar size={AvatarSize.S} src={image} alt={heading || text} className={s.image} />}
            <div className={s.content}>
                {heading && <h3 className={s.heading}>{heading}</h3>}
                {text && <p className={s.text}>{text}</p>}
            </div>
        </div>
    );
});

export { Option };
