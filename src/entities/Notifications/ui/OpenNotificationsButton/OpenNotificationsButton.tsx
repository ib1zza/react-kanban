import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faSolidBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as faRegularBell } from '@fortawesome/free-regular-svg-icons';
import { doc, setDoc } from 'firebase/firestore';
import s from './OpenNotificationsButton.module.scss';
import { useAuth } from '../../../../app/providers/authRouter/ui/AuthContext';
import { getUserNotifications } from '../../model/services/API/getUserNotifications';
import { useAppDispatch, useAppSelector } from '../../../../app/providers/StoreProvider';

import Notification from '../Notification';
import { readNotification } from '../../model/services/API/readNotification';
import { db } from '../../../../firebase';
import { getNotifications } from '../../model/selectors/getNotifications/getNotifications';
import { notificationsActions } from '../../model/slice/notificationSlice';
import { NotificationItem } from '../../model/types/NotificationsSchema';
import Button from '../../../../shared/ui/Button/Button';

// eslint-disable-next-line max-len
import { getUnreadNotificationsCount } from '../../model/selectors/getUnreadNotificationsCount/getUnreadNotificationsCount';

const OpenNotificationsButton = () => {
    const { user } = useAuth();
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(getNotifications);
    const unreadCount = useAppSelector(getUnreadNotificationsCount);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getNotifs() {
            if (!user?.uid) return;
            await getUserNotifications(user.uid).then((res) => {
                console.log(res);
                if (!res) {
                    setDoc(doc(db, 'notifications', user.uid), {});
                    dispatch(notificationsActions.setNotifications([]));
                    return;
                }
                dispatch(notificationsActions.setNotifications(
                    Object.values(res).sort((a, b) => b.timestamp - a.timestamp),
                ));
            });
        }

        getNotifs();
    }, [user?.uid]);

    const toggler = () => {
        setOpen((prev) => !prev);
    };

    const readAll = () => {
        if (!user?.uid || !notifications.length || !unreadCount) return;
        notifications.filter(
            (notif: { read: boolean; }) => !notif.read,
        ).forEach((notif: { uid: string; }) => {
            readNotification(user.uid, notif.uid);
        });
        dispatch(notificationsActions.readAllNotifications());
    };
    function listener() {
        setOpen(false);
    }

    useEffect(() => {
        if (open) {
            if (unreadCount) {
                readAll();
            }
            setTimeout(() => {
                document.body.addEventListener('click', listener, { once: true });
            }, 50);
        }
    }, [open]);

    return (
        <Button className={s.button} onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon onClick={toggler} icon={unreadCount ? faSolidBell : faRegularBell} />
            {!!unreadCount && <div className={s.count}>{unreadCount}</div>}

            {open && (
                <div className={s.notificationsContainer}>
                    {notifications.length ? '' : 'Нет уведомлений'}
                    {notifications.map((notif: NotificationItem) => (
                        <Notification data={notif} key={notif.uid} />
                    ))}
                </div>
            )}
        </Button>
    );
};

export default OpenNotificationsButton;
