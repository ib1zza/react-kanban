import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationsSchema } from '../../types/NotificationsSchema';
import { readNotificationQuery } from '../API/readNotificationQuery';

export const readAllNotifications = createAsyncThunk<any, string, { rejectValue: string }>(
    'notifications/readAllNotifications',
    async (userId, thunkAPI) => {
        try {
            const { notifications } = (thunkAPI.getState() as NotificationsSchema);

            return await Promise.allSettled(notifications.filter(
                (notification) => !notification.read,
            )
                // eslint-disable-next-line no-promise-executor-return
                .map((notification) => new Promise(() => readNotificationQuery(userId, notification.uid))));
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error while getting notifications');
        }
    },
);
