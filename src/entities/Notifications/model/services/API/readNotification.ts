import { updateDocument } from '../../../../../shared/API/updateDocument';

export const readNotification = async (
    userId: string,
    notificationId: string,
) => {
    try {
        await updateDocument('notifications', userId, {
            [`${notificationId}.` + 'read']: true,
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
