import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export async function deleteNotificationRt(
    notificationId: string,
    userId: string,
) {
    try {
        await remove(ref(rtdb, `usersNotifications/${userId}/${notificationId}`));
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}
