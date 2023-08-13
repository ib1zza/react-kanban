import { deleteField } from 'firebase/firestore';
import { updateDocument } from '../../../../../shared/API/updateDocument';

export const deleteNotification = async (
    userId: string,
    notificationId: string,
) => {
    try {
        await updateDocument('notifications', userId, {
            [notificationId]: deleteField(),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
