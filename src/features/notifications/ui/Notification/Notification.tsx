import React from 'react';
import s from "./Notification.module.scss";
import {NotificationItem, NotificationType} from "../../../../app/types/Notifications";
import NotificationMessageInvited from "./NotificationMessageInvited";
import {classNames} from "../../../../shared/lib/classNames/classNames";

interface Props {
    data: NotificationItem;
}
const Notification = ({data}: Props) => {
    return (
        <div className={classNames(s.item, {[s.read]: data.read})}>
            {data.payload.type === NotificationType.BOARD_INVITED ? (
                <NotificationMessageInvited data={data.payload} notificationId={data.uid}/>
            ) : null}
        </div>
    );
};

export default Notification;