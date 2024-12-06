import { ref, set, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { LinkedUserType } from 'app/types/IBoard';

export const addUserToBoardRt = async (
    userId: string,
    boardId: string,
    role: LinkedUserType | keyof typeof LinkedUserType,
    notificationId: string
) => {
    // добавляем доску в userBoards пользователя
    await update(ref(rtdb, `usersBoards/${userId}`), {
        [boardId]: true,
    });
    await update(ref(rtdb, `boards/${boardId}/users/${userId}`), {
        role,
        dateInvited: Date.now(),
        joined: true,
    });

    await update(ref(rtdb, `usersNotifications/${userId}/${notificationId}`), {
        isAccepted: true,
        read: true,
    });
};
