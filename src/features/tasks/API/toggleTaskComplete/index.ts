import { ref, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const toggleTaskComplete = async (
    taskId: string,
    columnId: string,
    boardId: string,
    newStatus: boolean,
) => update(ref(rtdb, `boards/${boardId}/columns/${columnId}/tasks/${taskId}`), {
    isCompleted: newStatus,
});
