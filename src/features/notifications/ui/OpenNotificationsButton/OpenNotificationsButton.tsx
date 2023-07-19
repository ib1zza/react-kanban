import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faSolidBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as faRegularBell } from '@fortawesome/free-regular-svg-icons';
import { doc, setDoc } from 'firebase/firestore';
import s from './OpenNotificationsButton.module.scss';
import { useAuth } from '../../../../app/providers/authRouter/ui/AuthContext';
import { getUserNotifications } from '../../../../entities/Notifications/API/getUserNotifications';
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store/store';
import { setNotifications } from '../../../../app/providers/store/Reducers/notificationSlice';
import Notification from '../Notification/Notification';
import { readNotification } from '../../../../entities/Notifications/API/readNotification';
import { db } from '../../../../firebase';

interface Props {
    notificationsCount: number;
}

const OpenNotificationsButton = () => {
    const { user } = useAuth();
    const dispatch = useAppDispatch();
    const { notifications } = useAppSelector((state) => state.notifications);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getNotifs() {
            if (!user?.uid) return;
            await getUserNotifications(user.uid).then((res) => {
                console.log(res);
                if (!res) {
                    setDoc(doc(db, 'notifications', user.uid), {});
                    dispatch(setNotifications([]));
                    return;
                }
                dispatch(setNotifications(
                    Object.values(res).sort((a, b) => b.timestamp - a.timestamp))
                );
            });
        }

        getNotifs();
    }, [user?.uid]);

    console.log(notifications.map((notif) => notif.timestamp));

    useEffect(() => {
        setUnreadCount(notifications.filter((notif) => !notif.read).length);
    }, [notifications]);

    const toggler = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        if (open) readAll();
    }, [open]);

    const readAll = () => {
        if (!user?.uid || !notifications.length || !unreadCount) return;
        notifications.filter((notif) => !notif.read).forEach((notif) => {
            readNotification(user.uid, notif.uid);
        });
        dispatch(setNotifications(notifications.map((notif) => ({ ...notif, read: true }))));
    };

    return (
        <button className={s.button}>
            <FontAwesomeIcon onClick={toggler} icon={unreadCount ? faSolidBell : faRegularBell} />
            {!!unreadCount && <div className={s.count}>{unreadCount}</div>}

            {open && (
                <div className={s.notificationsContainer}>
                    {notifications.map((notif) => (
                        <Notification data={notif} key={notif.uid} />
                    ))}
                </div>
            )}
        </button>
    );
};

export default OpenNotificationsButton;
