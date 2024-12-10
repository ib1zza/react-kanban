import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const deleteColumn = async (
    boardId: string,
    columnId: string,
) => {
    try {
        await remove(ref(rtdb, `boards/${boardId}/columns/${columnId}`));
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
