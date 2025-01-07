import { deleteField } from 'firebase/firestore';
import { updateDocument } from 'shared/API/updateDocument';
import { ref, remove, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const deleteTask = async (
    boardId: string,
    columnId: string,
    taskId: string,
) => {
    try {
        await remove(ref(rtdb, `boards/${boardId}/columns/${columnId}/tasks/${taskId}`));


    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
