import { subscribe } from 'shared/API/subscribe';
import { NotificationItem } from 'entities/Notifications/model/types/NotificationsSchema';

// returns userNotificationsCollection
export const subscribeToUserNotifications = (
    userId: string,
    cb: (data: Record<string, NotificationItem>) => void,
) => subscribe<Record<string, NotificationItem>>(`usersNotifications/${userId}`, cb);
