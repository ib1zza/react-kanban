import React, {
    Suspense, useEffect, useState,
} from 'react';
import { faBell as faSolidBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as faRegularBell } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { subscribeToUserNotifications } from 'entities/Notifications/model/services/API/subscribeToUserNotifications';
import { notificationsActions } from 'entities/Notifications/model/slice/notificationSlice';
import { readNotificationsRt } from 'entities/Notifications/model/services/API/readNotificationsRt';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import {
    deleteAllNotificationsRt,
} from 'entities/Notifications/model/services/API/deleteAllNotificationsRt';
import Modal from 'shared/ui/Modal/Modal';
import ProfileSkeleton from 'features/Profile/ui/ProfileSkeleton';
import { Profile } from 'features/Profile';
import s from './OpenNotificationsButton.module.scss';
import Notification from '../Notification';
import { NotificationItem } from '../../model/types/NotificationsSchema';
import Button from '../../../../shared/ui/Button/Button';
// eslint-disable-next-line max-len
import { getUnreadNotificationsCount } from '../../model/selectors/getUnreadNotificationsCount/getUnreadNotificationsCount';
import { getNotifications as getNotificationsSelector } from '../../model/selectors/getNotifications/getNotifications';

const OpenNotificationsButton = () => {
    const { user } = useAuth();
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(getNotificationsSelector);
    const unreadCount = useAppSelector(getUnreadNotificationsCount);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const unsub = subscribeToUserNotifications(
            user.uid,
            (data) => {
                if (data) {
                    dispatch(notificationsActions.setNotifications(Object.values(data)));
                }
            },
        );

        return () => {
            unsub();
        };
    }, [user.uid]);

    const toggler = () => {
        setOpen(true);
    };

    const readAll = () => {
        if (!user?.uid || !unreadCount) return;
        readNotificationsRt(user.uid, notifications.map((el) => el.uid));
        // dispatch(readAllNotifications(user.uid));
    };
    function listener(e: MouseEvent) {
        e.stopPropagation();
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

    const handleDeleteAll = () => {
        deleteAllNotificationsRt(user.uid, notifications.map((el) => el.uid));
        dispatch(notificationsActions.setNotifications([]));
    };

    return (
        <>
            <Button className={s.button}>
                <MemoizedFontAwesomeIcon onClick={toggler} icon={faSolidBell} />
                {!!unreadCount && <div className={s.count}>{unreadCount}</div>}

            </Button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    {/* TODO: add skeleton */}
                    <Suspense fallback={null}>
                        <div className={s.notificationsContainer} onClick={(e) => e.stopPropagation()}>

                            {notifications.length ? '' : 'Нет уведомлений'}
                            {!!notifications.length
                                && <button onClick={handleDeleteAll} className={s.deleteAll}>Удалить все</button>}
                            <Suspense fallback={<></>}>
                                {notifications.map((notif: NotificationItem) => (
                                    <Notification data={notif} key={notif.uid} />
                                ))}
                            </Suspense>

                        </div>
                    </Suspense>
                </Modal>

            )}
        </>
    );
};

export default OpenNotificationsButton;
