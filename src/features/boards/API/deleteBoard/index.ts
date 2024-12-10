import {ref, remove} from 'firebase/database';
import {rtdb} from 'shared/config/firebase/firebase';
import {IBoard, IBoardFromServer} from "app/types/IBoardFromServer";
import {leaveFromBoard} from "features/boards";

export const deleteBoard = async (board: IBoard) => {

    await remove(ref(rtdb, `boards/${board.uid}`));

    // Remove users from the board
    const users = board.users;

    if (!users) {
        return true;
    }

    try {
        for (const user of users) {
            await leaveFromBoard(board.uid, user.uid);
            if (user?.notificationUid) {
                await remove(ref(rtdb, `usersNotifications/${user.uid}/${user.notificationUid}`));
            }
        }

    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
