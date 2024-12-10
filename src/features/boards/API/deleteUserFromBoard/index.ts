import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const deleteUserFromBoard = async (
    boardId: string,
    userId: string,
) => {
    try {
        await remove(ref(rtdb, `boards/${boardId}/users/${userId}`));
        await remove(ref(rtdb, `usersBoards/${userId}/${boardId}`));
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
