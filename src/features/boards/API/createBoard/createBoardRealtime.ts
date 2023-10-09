import { ref, set, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { v4 as uuid } from 'uuid';
import { updateDocument } from 'shared/API/updateDocument';
import { arrayUnion } from '@firebase/firestore';
import { LinkedUserType } from 'app/types/IBoard';

export const createBoardRt = async (title: string, userId: string) => {
    try {
        const newBoardId = uuid();

        await set(ref(rtdb, `boards/${newBoardId}`), {
            title,
            uid: newBoardId,
            columns: {},
            ownerId: userId,
            timeCreated: Date.now(),
            timeUpdated: Date.now(),
            users: {
                [userId]: {
                    role: LinkedUserType.USER,
                    dateInvited: Date.now(),
                    joined: true,
                },
            },
        });

        await update(ref(rtdb, `usersBoards/${userId}`), {
            [newBoardId]: true,
        });

        await updateDocument('users', userId, {
            boardsIds: arrayUnion(newBoardId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
