import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { updateDocument } from 'shared/API/updateDocument';
import { ref, set, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { v4 as uuid } from 'uuid';
import { arrayUnion } from '@firebase/firestore';

// export async function editBoard(
//     boardId: string,
//     newData: { [key in keyof IBoard]?: IBoard[key] },
// ) {
//     return updateDocument('boards', boardId, newData);
// }

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
