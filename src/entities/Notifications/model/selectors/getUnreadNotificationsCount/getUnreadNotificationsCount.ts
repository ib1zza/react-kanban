import { createSelector } from '@reduxjs/toolkit';
import { getNotifications } from '../getNotifications/getNotifications';

export const getUnreadNotificationsCount = createSelector(
    getNotifications,
    (notifications) => notifications.filter((notif) => !notif.read).length,
);
