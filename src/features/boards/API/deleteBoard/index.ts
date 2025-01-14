import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { IBoard } from 'app/types/IBoardFromServer';

export const deleteBoardRt = async (board: IBoard) => {
    await remove(ref(rtdb, `boards/${board.uid}`));

    // Remove users from the board
    const { users } = board;

    if (!users) {
        return true;
    }

    try {
        await Promise.all(users.map(async (user) => {
            await remove(ref(rtdb, `usersBoards/${user.uid}/${board.uid}`));
            if (user?.notificationUid) {
                await remove(ref(rtdb, `usersNotifications/${user.uid}/${user.notificationUid}`));
            }
        }));
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
