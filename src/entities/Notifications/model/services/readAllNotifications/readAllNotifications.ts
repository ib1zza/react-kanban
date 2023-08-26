import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationsSchema } from '../../types/NotificationsSchema';
import { readNotificationQuery } from '../API/readNotificationQuery';

type getStateInterface = {
    notifications: NotificationsSchema;
}
export const readAllNotifications = createAsyncThunk<any, string, { rejectValue: string, getState: getStateInterface }>(
    'notifications/readAllNotifications',
    async (userId, { getState, rejectWithValue }) => {
        try {
            const { notifications } = (getState() as getStateInterface).notifications;

            return await Promise.allSettled(notifications.filter(
                (notification) => !notification.read,
            )
            // eslint-disable-next-line no-promise-executor-return
                .map((notification) => new Promise(() => readNotificationQuery(userId, notification.uid))));
        } catch (e) {
            console.log(e);
            return rejectWithValue('error while getting notifications');
        }
    },
);
