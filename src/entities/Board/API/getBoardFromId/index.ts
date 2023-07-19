import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { IBoard } from '../../../../app/types/IBoard';

export async function getBoardFromId(id: string) {
    const ref = doc(db, 'boards', id);
    return await getDoc(ref).then((doc) => doc.data() as IBoard);
}
