import React, { memo } from 'react';
import s from './Footer.module.scss';

interface FooterProps {
    active: string
    finished: string
}
const Footer = ({ active, finished }: FooterProps) => (
    <footer className={s.footer}>
        <div className={s.tasksInfo}>
            <span>
                Active tasks:
                {active}
            </span>
            <span>
                Finished tasks:
                {finished}
            </span>
        </div>
        <div className={s.description}>
            Kanban board by ,
            {new Date().getFullYear()}
        </div>
    </footer>
);

export default memo(Footer);
