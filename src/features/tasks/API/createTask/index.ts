import { v4 as uuid } from 'uuid';
import { updateDocument } from '../../../users/API/updateDocument';

interface ITaskForCreate {
  title: string;
  description: string;
  creatorId: string;
  //  TODO: add tags
  tags?: string[];
}

export const createTask = async (
    taskData: ITaskForCreate,
    boardId: string,
    columnId: string,
) => {
    try {
        const newTaskId = uuid();
        await updateDocument('boards', boardId, {
            [`columns.${columnId}.tasks.${newTaskId}`]: {
                uid: newTaskId,
                title: taskData.title,
                description: taskData.description,
                timeCreated: Date.now(),
                isCompleted: false,
                tags: [],
                creatorId: taskData.creatorId,
                subtasks: {},
            },
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
