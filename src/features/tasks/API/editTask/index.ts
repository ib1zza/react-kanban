import { ITask } from 'app/types/IBoardFromServer';
import { ref, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

type NewData = {
    [key in keyof ITask]?: ITask[key]
}
export async function editTask(
    boardId: string,
    columnId: string,
    taskId: string,
    newData: NewData,
) {
    const updatedData = (Object.keys(newData)).reduce(
        (acc, key) => {
            acc[`columns/${columnId}/tasks/${taskId}/${key}`] = newData[key as keyof ITask];
            return acc;
        },
        {} as Record<string, any>,
    );

    // return updateDocument('boards', boardId, updatedData);
    return await update(ref(rtdb, `boards/${boardId}`), updatedData);
}
