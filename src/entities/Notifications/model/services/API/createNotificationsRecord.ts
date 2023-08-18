import { doc, setDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase/firebase';

export async function createNotificationsRecord(userId: string) {
    return setDoc(doc(db, 'notifications', userId), {});
}
