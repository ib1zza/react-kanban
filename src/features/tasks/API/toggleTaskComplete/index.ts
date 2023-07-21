import { updateDocument } from '../../../users/API/updateDocument';

export const toggleTaskComplete = async (
    taskId: string,
    columnId: string,
    boardId: string,
    newStatus: boolean,
) => updateDocument('boards', boardId, {
    [`columns.${columnId}.tasks.${taskId}.isCompleted`]: newStatus,
});
