import { classNames } from 'shared/lib/classNames/classNames';
import s from './Avatar.module.scss';

export enum AvatarSize {
    S = 's',
    M = 'm',
    L = 'l',
}

interface AvatarProps {
    src?: string;
    alt: string;
    className?: string;
    size?: AvatarSize;
}
const Avatar = (props: AvatarProps) => {
    const {
        className, src, alt, size = AvatarSize.M,
    } = props;
    return (
        <div className={classNames(s.Avatar, {}, [className, s[size]])}>
            {src
                ? <img className={s.image} src={src} alt={alt} />
                : (
                    <div className={s.initials}>
                        {alt.slice(0, 2)}
                    </div>
                )}
        </div>
    );
};

export { Avatar };