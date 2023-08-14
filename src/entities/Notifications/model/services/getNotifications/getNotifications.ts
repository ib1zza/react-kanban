import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationItem } from '../../types/NotificationsSchema';
import { getUserNotifications } from '../API/getUserNotifications';
import { notificationsActions } from '../../slice/notificationSlice';
import { createNotificationsRecord } from '../API/createNotificationsRecord';

export const getNotifications = createAsyncThunk<NotificationItem[], string, { rejectValue: string }>(
    'notifications/getNotifications',
    async (userId, thunkAPI) => {
        try {
            const response = await getUserNotifications(userId);

            if (!response) {
                await createNotificationsRecord(userId);
                thunkAPI.dispatch(notificationsActions.setNotifications([]));
                return [];
            }

            const notificationItems = Object.values(response).sort((a, b) => b.timestamp - a.timestamp);
            thunkAPI.dispatch(notificationsActions.setNotifications(notificationItems));

            return notificationItems;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error while getting notifications');
        }
    },
);
