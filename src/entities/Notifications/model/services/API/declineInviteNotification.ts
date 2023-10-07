import { arrayRemove } from 'firebase/firestore';
import { updateDocument } from 'shared/API/updateDocument';
import { ref, remove, set } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { deleteNotification } from './deleteNotification';

export async function declineInviteNotification(
    notificationId: string,
    userId: string,
    boardId: string,
) {
    try {
        // если пользователь отклоняет приглашение, то
        // удаляем уведомление и удаляем его из списка гостей

        remove(ref(rtdb, `boards/${boardId}/users/${userId}`));
        remove(ref(rtdb, `usersNotifications/${userId}/${notificationId}`));

        // await deleteNotification(userId, notificationId);
        // await updateDocument('boards', boardId, {
        //     guestsAllowed: arrayRemove(userId),
        //     usersAllowed: arrayRemove(userId),
        // });
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}
