import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationItem } from '../../../types/Notifications';

export interface userInfoState {
    notifications: NotificationItem[];
}

const initialState: userInfoState = {
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.notifications = state.notifications.filter(
                (notification) => notification.uid !== action.payload,
            )
                .concat({ ...notif, payload: { ...notif.payload, isAccepted: true } })
                .sort((a, b) => b.timestamp - a.timestamp);
        },
    },
});

export const {
    setNotifications,
    removeNotification,
    acceptNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
