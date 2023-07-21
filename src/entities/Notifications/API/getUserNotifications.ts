import { doc, getDoc } from 'firebase/firestore';
import { NotificationItem } from '../../../app/types/Notifications';
import { db } from '../../../firebase';

export async function getUserNotifications(userId: string) {
    const ref = doc(db, 'notifications', userId);
    return getDoc(ref).then((doc) => doc.data() as Record<string, NotificationItem>);
}
