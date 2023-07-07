import { createSlice } from "@reduxjs/toolkit";
import {NotificationItem, NotificationType} from "../../../types/Notifications";

export interface userInfoState {
    notifications: NotificationItem[];
}

const initialState: userInfoState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
    },
});

export const { setNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
