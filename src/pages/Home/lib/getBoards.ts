import {
    collection, getDocs, or, query, where,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from 'firebase';
import { IBoard } from 'app/types/IBoard';

export const getBoards = async (user: User | null) => {
    if (!user) return [];
    const dataRef = query(
        collection(db, 'boards'),
        or(
            where('usersAllowed', 'array-contains', `${user.uid}`),
            where('guestsAllowed', 'array-contains', `${user.uid}`),
            where('ownerId', '==', `${user.uid}`),
        ),
    );

    const docsSnap = await getDocs(dataRef);
    const res: IBoard[] = [];
    docsSnap.forEach((doc) => {
        res.push({
            uid: doc.data().uid,
            title: doc.data().title,
            usersAllowed: doc.data().usersAllowed,
            timeCreated: doc.data().timeCreated,
            timeUpdated: doc.data().timeUpdated,
            ownerId: doc.data().ownerId,
            guestPermissions: doc.data().guestPermissions,
            guestsAllowed: doc.data().guestsAllowed,
            columns: doc.data().columns,
        });
    });
    return res;
};
