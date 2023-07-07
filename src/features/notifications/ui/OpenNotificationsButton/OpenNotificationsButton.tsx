import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell as faSolidBell} from "@fortawesome/free-solid-svg-icons";
import {faBell as faRegularBell} from "@fortawesome/free-regular-svg-icons";
import s from "./OpenNotificationsButton.module.scss";
import {NotificationItem, NotificationType} from "../../../../app/types/Notifications";
import {useAuth} from "../../../../app/providers/authRouter/ui/AuthContext";
import {getUserNotifications} from "../../../../entities/Notifications/API/getUserNotifications";
import {useAppDispatch, useAppSelector} from "../../../../app/providers/store/store";
import {setNotifications} from "../../../../app/providers/store/Reducers/notificationSlice";
import {createNotificationText} from "../../lib/createNotificationText";
import Notification from "../Notification/Notification";
import {readNotification} from "../../../../entities/Notifications/API/readNotification";

interface Props {
    notificationsCount: number;
}

const OpenNotificationsButton = () => {
    const {user} = useAuth();
    const dispatch = useAppDispatch();
    const {notifications} = useAppSelector(state => state.notifications);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getNotifs() {
            if (!user?.uid) return;
            const res = await getUserNotifications(user.uid)
            const notifs = Object.values(res).sort((a, b) => a.timestamp - b.timestamp);
            console.log(notifs);
            // setNotifs(notifs);
            dispatch(setNotifications(notifs));
        }
        getNotifs();
    }, [user]);

    useEffect(() => {
        setUnreadCount(notifications.filter(notif => !notif.read).length)
    }, [notifications])

    const toggler = () => {
        if(open) {
            dispatch(setNotifications(notifications.map(notif => ({...notif, read: true}))));
        }

        setOpen(prev => !prev);
    }

    useEffect(() => {
        if(open) readAll();
    }, [open])

    const readAll = () => {
        if(!user?.uid || !notifications.length || !unreadCount) return;
        notifications.filter(notif => !notif.read).forEach(notif => {
            readNotification(user.uid, notif.uid)
        })
    }

    return (
        <button className={s.button}>
            <FontAwesomeIcon onClick={toggler} icon={unreadCount ? faSolidBell : faRegularBell}/>
            {!!unreadCount && <div className={s.count}>{unreadCount}</div>}

            {open && <div className={s.notificationsContainer}>
                {notifications.map(notif => (
                    <Notification data={notif} key={notif.uid}/>
                ))}
            </div>}
        </button>
    );
};

export default OpenNotificationsButton;