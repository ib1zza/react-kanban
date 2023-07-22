import React from 'react';
import s from './Notification.module.scss';

import NotificationMessageInvited from './NotificationMessageInvited';
import { classNames } from '../../../shared/lib/classNames/classNames';
import NotificationType, { NotificationItem } from '../model/types/NotificationsSchema';

interface Props {
    data: NotificationItem;
}
const Notification = ({ data }: Props) => (
    <div className={classNames(s.item, { [s.read]: data.read })}>
        {data.payload.type === NotificationType.BOARD_INVITED ? (
            <NotificationMessageInvited data={data.payload} notificationId={data.uid} />
        ) : null}
    </div>
);

export default Notification;
