import { doc, getDoc } from 'firebase/firestore';
import { IBoardFromServer } from 'app/types/IBoardFromServer';
import { db } from 'shared/config/firebase/firebase';

export async function getBoardFromId(id: string) {
    const ref = doc(db, 'boards', id);
    return getDoc(ref).then((doc) => doc.data() as IBoardFromServer);
}
