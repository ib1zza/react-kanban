import { ref, set } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { v4 as uuid } from 'uuid';
import { updateDocument } from 'shared/API/updateDocument';
import { arrayUnion } from '@firebase/firestore';

export const createBoardRt = async (title: string, userId: string) => {
    try {
        const newBoardId = uuid();

        await set(ref(rtdb, `boards/${newBoardId}`), {
            title,
            uid: newBoardId,
            columns: {},
            ownerId: userId,
            users: {},
            timeCreated: Date.now(),
            timeUpdated: Date.now(),
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
