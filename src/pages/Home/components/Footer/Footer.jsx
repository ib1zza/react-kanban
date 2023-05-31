import React from 'react';
import s from "../Layout/Layout.module.scss";

const Footer = ({active, finished}) => {
    return (
        <footer className={s.footer}>
            <div className={s.tasksInfo}>
                <span>Active tasks: {active}</span>
                <span>Finished tasks: {finished}</span>
            </div>
            <div className={s.description}>Kanban board by ,{new Date().getFullYear()}</div>
        </footer>
    )
}

export default Footer
