import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { ref, set, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export const editBoard = async (
    boardId: string,
    newData: { [key in keyof IBoard]?: IBoard[key] },
) => {
    try {
        await update(ref(rtdb, `boards/${boardId}`), newData);
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
