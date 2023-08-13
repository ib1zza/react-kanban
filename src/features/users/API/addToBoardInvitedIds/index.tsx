import { arrayUnion } from '@firebase/firestore';
import { updateDocument } from '../../../../shared/API/updateDocument';

export async function addToBoardInvitedIds(userId: string, boardId: string) {
    try {
        await updateDocument('users', userId, {
            boardInvitedIds: arrayUnion(boardId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}
