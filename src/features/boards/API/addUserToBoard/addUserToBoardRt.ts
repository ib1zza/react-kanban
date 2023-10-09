import { ref, set, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { LinkedUserType } from 'app/types/IBoard';

export const addUserToBoardRt = (
    userId: string,
    boardId: string,
    role: LinkedUserType | keyof typeof LinkedUserType,
) => {
    update(ref(rtdb, `usersBoards/${userId}`), {
        [boardId]: true,
    });
    update(ref(rtdb, `boards/${boardId}/users/${userId}`), {
        role,
        dateInvited: Date.now(),
        joined: true,
    });
    // update(ref(rtdb, `usersNotifications/${userId}/`), userId, {
    //     [`${notificationId}.payload.isAccepted`]: true,
    //     [`${notificationId}.read`]: true,
    // });
};
