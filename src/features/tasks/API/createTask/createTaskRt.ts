import {ref, update} from 'firebase/database';
import {rtdb} from 'shared/config/firebase/firebase';
import {v4 as uuid} from 'uuid';

export interface ITaskForCreate {
    title: string;
    description: string;
    creatorId: string;
    boardId: string;
    columnId: string;
    timeCreated?: number | string;
    isCompleted?: boolean;
    uid?: string;
    displayId?: number;
    //  TODO: add tags
    tags?: string[];
}

export const createTaskRt = async (
    taskData: ITaskForCreate,
) => {
    const {
        boardId,
        columnId,
        timeCreated,
        creatorId,
        displayId = 0,
        uid,
        tags = [],
        title,
        description,
        isCompleted = false,
    } = taskData;

    const newTaskId = uid || uuid();

    const updates = {
        [`boards/${boardId}/columns/${columnId}/tasks/${newTaskId}`]: {
            uid: newTaskId,
            title,
            description,
            timeCreated: timeCreated || Date.now(),
            isCompleted,
            tags,
            creatorId,
            displayId,
        },
    };
    return await update(ref(rtdb), updates);
};

