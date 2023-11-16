import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationItem } from '../../types/NotificationsSchema';
import { getUserNotifications } from '../API/getUserNotifications';
import { createNotificationsRecord } from '../API/createNotificationsRecord';

export const getNotifications = createAsyncThunk<NotificationItem[], string, { rejectValue: string }>(
    'notifications/getNotifications',
    async (userId, thunkAPI) => {
        try {
            const response = await getUserNotifications(userId);

            if (!response) {
                await createNotificationsRecord(userId);
                return [];
            }
            return Object.values(response);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error while getting notifications');
        }
    },
);
