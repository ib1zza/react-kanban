import { ITask } from 'app/types/IBoard';
import { updateDocument } from 'shared/API/updateDocument';

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
            acc[`columns.${columnId}.tasks.${taskId}.${key}`] = newData[key as keyof ITask];
            return acc;
        },
        {} as any,
    );

    return updateDocument('boards', boardId, updatedData);
}
