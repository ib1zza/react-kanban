import { doc, getDoc } from "firebase/firestore";

import {db} from "../../../../../firebase";
import { NotificationItem } from "../../types/NotificationsSchema";

export async function getUserNotifications(userId: string) {
    const ref = doc(db, "notifications", userId);
    return await getDoc(ref).then((doc) => {
        return doc.data() as Record<string, NotificationItem>;
    });
}