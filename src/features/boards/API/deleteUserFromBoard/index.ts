import { arrayRemove } from 'firebase/firestore';
import { LinkedUserType } from '../../../../app/types/IBoard';
import { updateDocument } from '../../../../shared/API/updateDocument';

export const deleteUserFromBoard = async (
    boardId: string,
    userId: string,
    userPermission: LinkedUserType,
) => {
    try {
        await updateDocument('boards', boardId, {
            [userPermission === LinkedUserType.USER
                ? 'usersAllowed'
                : 'guestsAllowed']: arrayRemove(userId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
