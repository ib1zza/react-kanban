import { updateDocument } from 'shared/API/updateDocument';

export const readNotificationQuery = async (
    userId: string,
    notificationId: string,
) => {
    try {
        console.log('reading notification', notificationId);
        await updateDocument('notifications', userId, {
            [`${notificationId}.` + 'read']: true,
        });
    } catch (e) {
        console.log(e);
    }
};
