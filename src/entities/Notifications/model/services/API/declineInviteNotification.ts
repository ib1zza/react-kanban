import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export async function declineInviteNotification(
    notificationId: string,
    userId: string,
    boardId: string,
) {
    try {
        // если пользователь отклоняет приглашение, то
        // удаляем уведомление и удаляем его из списка гостей

        await remove(ref(rtdb, `boards/${boardId}/users/${userId}`));
        await remove(ref(rtdb, `usersNotifications/${userId}/${notificationId}`));
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}
