import { IBoardFromServer, LinkedUserType } from 'app/types/IBoardFromServer';
import { ref, set, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const editBoard = async (
    boardId: string,
    newData: { [key in keyof IBoardFromServer]?: IBoardFromServer[key] },
) => {
    try {
        await update(ref(rtdb, `boards/${boardId}`), newData);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
