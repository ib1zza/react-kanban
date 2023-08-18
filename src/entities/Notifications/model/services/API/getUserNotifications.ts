import { doc, getDoc } from 'firebase/firestore';

import { db } from 'shared/config/firebase/firebase';
import { NotificationItem } from '../../types/NotificationsSchema';

export async function getUserNotifications(userId: string) {
    const ref = doc(db, 'notifications', userId);
    return getDoc(ref).then((doc) => doc.data() as Record<string, NotificationItem>);
}
