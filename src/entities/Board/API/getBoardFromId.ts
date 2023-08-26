import { doc, getDoc } from 'firebase/firestore';
import { IBoard } from 'app/types/IBoard';
import { db } from 'shared/config/firebase/firebase';

export async function getBoardFromId(id: string) {
    const ref = doc(db, 'boards', id);
    return getDoc(ref).then((doc) => doc.data() as IBoard);
}
