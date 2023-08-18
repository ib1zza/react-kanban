import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem, NotificationsSchema } from '../types/NotificationsSchema';
import { getNotifications } from '../services/getNotifications/getNotifications';
import { readAllNotifications } from '../services/readAllNotifications/readAllNotifications';

const initialState: NotificationsSchema = {
    notifications: [],
    isLoading: false,
    error: '',
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
            // @ts-ignore
            notif.payload.isAccepted = true;
        },
        // readAllNotifications: (state) => {
        //     state.notifications = state.notifications.map(
        //         (notification) => ({ ...notification, read: true }),
        //     );
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = 'error while getting notifications';
            })
            .addCase(readAllNotifications.pending, (state) => {
                // state.notifications = state.notifications.map(
                //     (notification) => ({ ...notification, read: true }),
                // );
            })
            .addCase(readAllNotifications.fulfilled, (state, action) => {
                state.notifications = state.notifications.map(
                    (notification) => ({ ...notification, read: true }),
                );
            })
            .addCase(readAllNotifications.rejected, (state, action) => {
                state.error = 'error while reading notifications';
            });
    },

});

export const { actions: notificationsActions } = notificationSlice;
export const { reducer: notificationReducer } = notificationSlice;
