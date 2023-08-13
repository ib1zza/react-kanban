import { arrayRemove, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { updateDocument } from '../../../../shared/API/updateDocument';

export const deleteBoard = async (boardId: string, userId: string) => {
    try {
        console.log(boardId);
        await deleteDoc(doc(db, 'boards', boardId));
        await updateDocument('users', userId, {
            boardsIds: arrayRemove(boardId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;

    // TODO delete boardId from all users that invited to this board
    //     TODO delete chat when board is deleted
};
