import {ref, remove} from 'firebase/database';
import {rtdb} from 'shared/config/firebase/firebase';
import {IBoard} from "app/types/IBoard";
import {leaveFromBoard} from "features/boards";

export const deleteBoard = async (board: IBoard) => {
    const users = Object.entries((board.users || {})).map(([id, info]) => ({
        id,
        ...info
    }))

    try {


        for (const user of users) {
            await leaveFromBoard(board.uid, user.id);
            if (user?.notificationUid) {
                await remove(ref(rtdb, `usersNotifications/${user.id}/${user.notificationUid}`));
            }
        }

        await remove(ref(rtdb, `boards/${board.uid}`));
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
