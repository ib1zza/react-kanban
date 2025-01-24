import { ref, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { v4 as uuid } from 'uuid';

export const createColumnRt = async (
    title: string,
    color: string,
    boardId: string,
    displayIndex: number,
) => {
    const newColumnId = uuid();

    const updates = {
        [`boards/${boardId}/columns/${newColumnId}`]: {
            uid: newColumnId,
            title,
            tasks: {},
            timeCreated: Date.now(),
            timeUpdated: Date.now(),
            color,
            displayIndex,
        },
    };
    return update(ref(rtdb), updates);
};
