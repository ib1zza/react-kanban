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
        console.log(boardId);
        // const updates = {
        //     [`boards/${boardId}/columns/${columnId}/tasks/${taskId}`]: {
        //         uid: newTaskId,
        //         title: taskData.title,
        //         description: taskData.description,
        //         timeCreated: Date.now(),
        //         isCompleted: false,
        //         tags: [],
        //         creatorId: taskData.creatorId,
        //     },
        // };
        remove(ref(rtdb, `boards/${boardId}/columns/${columnId}/tasks/${taskId}`));
        // await updateDocument('boards', boardId, {
        //     [`columns.${columnId}.tasks.${taskId}`]: deleteField(),
        // });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;

    // TODO delete boardId from all users that invited to this board
    //     TODO delete chat when board is deleted
};
