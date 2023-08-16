import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faSolidBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as faRegularBell } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import s from './OpenNotificationsButton.module.scss';

import Notification from '../Notification';
import { NotificationItem } from '../../model/types/NotificationsSchema';
import Button from '../../../../shared/ui/Button/Button';

// eslint-disable-next-line max-len
import { getUnreadNotificationsCount } from '../../model/selectors/getUnreadNotificationsCount/getUnreadNotificationsCount';
import { getNotifications as getNotificationsSelector } from '../../model/selectors/getNotifications/getNotifications';
import { getNotifications } from '../../model/services/getNotifications/getNotifications';
import { readAllNotifications } from '../../model/services/readAllNotifications/readAllNotifications';

const OpenNotificationsButton = () => {
    const { user } = useAuth();
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(getNotificationsSelector);
    const unreadCount = useAppSelector(getUnreadNotificationsCount);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getNotifs() {
            if (!user?.uid) return;
            dispatch(getNotifications(user.uid));
            // await getUserNotifications(user.uid).then((res) => {
            //     console.log(res);
            //     if (!res) {
            //         setDoc(doc(db, 'notifications', user.uid), {});
            //         dispatch(notificationsActions.setNotifications([]));
            //         return;
            //     }
            //     dispatch(notificationsActions.setNotifications(
            //         Object.values(res).sort((a, b) => b.timestamp - a.timestamp),
            //     ));
            // });
        }

        getNotifs();
    }, [user?.uid]);

    const toggler = () => {
        setOpen((prev) => !prev);
    };

    const readAll = () => {
        if (!user?.uid || !unreadCount) return;
        dispatch(readAllNotifications(user.uid));
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
