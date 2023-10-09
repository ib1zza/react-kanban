import { deleteField } from 'firebase/firestore';
import { updateDocument } from 'shared/API/updateDocument';
import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const deleteColumn = async (
    boardId: string,
    // userId: string,
    columnId: string,
) => {
    try {
        remove(ref(rtdb, `boards/${boardId}/columns/${columnId}`));

        // await updateDocument('boards', boardId, {
        //     [`columns.${columnId}`]: deleteField(),
        // });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
