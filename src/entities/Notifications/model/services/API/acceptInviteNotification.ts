import { addToBoardInvitedIds } from '../../../../../features/users';
import { updateDocument } from '../../../../../shared/API/updateDocument';

export async function acceptInviteNotification(
    notificationId: string,
    userId: string,
    boardId: string,
) {
    try {
        // если пользователь принимает приглашение, то
        // добавляем ему в boardInvitedIds доску и отмечаем
        // что он принял приглашение
        await addToBoardInvitedIds(userId, boardId);
        await updateDocument('notifications', userId, {
            [`${notificationId}.payload.isAccepted`]: true,
            [`${notificationId}.read`]: true,
        });
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}
