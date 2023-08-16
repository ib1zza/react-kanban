import { deleteField } from 'firebase/firestore';
import { updateDocument } from 'shared/API/updateDocument';

export const deleteTask = async (
    boardId: string,
    columnId: string,
    taskId: string,
) => {
    try {
        console.log(boardId);

        await updateDocument('boards', boardId, {
            [`columns.${columnId}.tasks.${taskId}`]: deleteField(),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;

    // TODO delete boardId from all users that invited to this board
    //     TODO delete chat when board is deleted
};
