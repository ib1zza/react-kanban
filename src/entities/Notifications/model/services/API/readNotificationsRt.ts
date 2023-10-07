import { rtdb } from 'shared/config/firebase/firebase';
import { ref, update } from 'firebase/database';

export const readNotificationsRt = (userId: string, ids: string[]) => {
    const readOneQuery = (id: string) => update(ref(rtdb, `usersNotifications/${userId}/${id}`), {
        read: true,
    });

    ids.forEach(readOneQuery);
};
