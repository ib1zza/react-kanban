import { ref, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { v4 as uuid } from 'uuid';

interface ITaskForCreate {
    title: string;
    description: string;
    creatorId: string;
    //  TODO: add tags
    tags?: string[];
}

export const createTaskRt = async (
    taskData: ITaskForCreate,
    boardId: string,
    columnId: string,
) => {
    const newTaskId = uuid();
    const updates = {
        [`boards/${boardId}/columns/${columnId}/tasks/${newTaskId}`]: {
            uid: newTaskId,
            title: taskData.title,
            description: taskData.description,
            timeCreated: Date.now(),
            isCompleted: false,
            tags: [],
            creatorId: taskData.creatorId,
        },
    };
    update(ref(rtdb), updates);
};
