import { arrayUnion } from '@firebase/firestore';
import { LinkedUserType } from '../../../../app/types/IBoardFromServer';
import { updateDocument } from '../../../../shared/API/updateDocument';

export const addUserToBoard = async (
    boardId: string,
    userId: string,
    userPermission: LinkedUserType,
) => {
    try {
        await updateDocument('boards', boardId, {
            [userPermission === LinkedUserType.USER
                ? 'usersAllowed'
                : 'guestsAllowed']: arrayUnion(userId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
