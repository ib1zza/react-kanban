import { arrayRemove } from 'firebase/firestore';
import { updateDocument } from '../../../users/API/updateDocument';
import { LinkedUserType } from '../../../../app/types/IBoard';

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
