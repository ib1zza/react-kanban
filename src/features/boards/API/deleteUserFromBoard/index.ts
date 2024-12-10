import { arrayRemove } from 'firebase/firestore';
import { ref, remove, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { LinkedUserType } from '../../../../app/types/IBoardFromServer';
import { updateDocument } from '../../../../shared/API/updateDocument';

export const deleteUserFromBoard = async (
    boardId: string,
    userId: string,
) => {
    try {
        remove(ref(rtdb, `boards/${boardId}/users/${userId}`));
        remove(ref(rtdb, `usersBoards/${userId}/${boardId}`));
        // await updateDocument('boards', boardId, {
        //     [userPermission === LinkedUserType.USER
        //         ? 'usersAllowed'
        //         : 'guestsAllowed']: arrayRemove(userId),
        // });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
