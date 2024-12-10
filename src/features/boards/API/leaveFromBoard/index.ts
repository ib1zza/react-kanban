import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import {IBoardFromServer} from "app/types/IBoardFromServer";

export const leaveFromBoard = async (boardId: string, userId: string) => {
    try {
        await remove(ref(rtdb, `usersBoards/${userId}/${boardId}`));
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
