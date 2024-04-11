import { classNames } from 'shared/lib/classNames/classNames';
import s from './Logo.module.scss';

interface LogoProps {
    className?: string
}

const Logo = ({ className }: LogoProps) => (
    <div className={classNames(s.logo, {}, [className])}>
        <div className={s.center}>
            <h1>
                <span>Awesome Kanban Board</span>
                <span>Awesome Kanban Board</span>
                <span>Awesome Kanban Board</span>
            </h1>
        </div>
    </div>
);

export { Logo };
