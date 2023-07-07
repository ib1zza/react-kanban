import React from 'react';
import s from './PopupNotifications.module.scss';
import {useAppSelector} from "../../../app/providers/store/store";

const PopupNotifications = () => {
    const {notifications} = useAppSelector(state => state.notifications);
    return (
        <div className={s.container}>
            {JSON.stringify(notifications)}
        </div>
    );
};

export default PopupNotifications;