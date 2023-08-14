import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

export async function createNotificationsRecord(userId: string) {
    return setDoc(doc(db, 'notifications', userId), {});
}
