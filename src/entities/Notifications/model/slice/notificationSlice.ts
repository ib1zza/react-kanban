import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem, NotificationsSchema } from '../types/NotificationsSchema';

const initialState: NotificationsSchema = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
            state.notifications = action.payload.sort((a, b) => b.timestamp - a.timestamp);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.uid !== action.payload,
            ).sort((a, b) => b.timestamp - a.timestamp);
        },
        acceptNotification: (state, action: PayloadAction<string>) => {
            const notif = state.notifications.find(
                (notification) => notification.uid === action.payload,
            );
            if (!notif) return;
            state.notifications = (state.notifications.filter(
                (notification) => notification.uid !== action.payload,
            )as any[])
                .concat({ ...notif, payload: { ...notif.payload, isAccepted: true } })
                .sort((a, b) => b.timestamp - a.timestamp);
        },
    },
});

export const { actions: notificationsActions } = notificationSlice;
export const { reducer: notificationReducer } = notificationSlice;
