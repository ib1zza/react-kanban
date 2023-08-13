import { v4 as uuid } from 'uuid';
import { updateDocument } from '../../../../shared/API/updateDocument';

export const createColumn = async (
    title: string,
    color: string,
    boardId: string,
) => {
    try {
        const newColumnId = uuid();
        await updateDocument('boards', boardId, {
            [`columns.${newColumnId}`]: {
                uid: newColumnId,
                title,
                tasks: {},
                timeCreated: Date.now(),
                timeUpdated: Date.now(),
                color,
            },
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
