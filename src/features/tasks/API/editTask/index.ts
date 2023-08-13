import { ITask } from '../../../../app/types/IBoard';
import { updateDocument } from '../../../../shared/API/updateDocument';

export async function editTask(
    boardId: string,
    columnId: string,
    taskId: string,
    newData: { [key in keyof ITask]?: ITask[key] },
) {
    const updatedData = Object.keys(newData).reduce(
        (acc: { [key: string]: any }, key: keyof ITask) => {
            acc[`columns.${columnId}.tasks.${taskId}.${key}`] = newData[key];
            return acc;
        },
        {},
    );

    return updateDocument('boards', boardId, updatedData);
}
