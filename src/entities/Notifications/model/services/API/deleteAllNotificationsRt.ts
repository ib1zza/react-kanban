import { ref, remove } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export async function deleteAllNotificationsRt(
    userId: string,

    ids: string[],
) {
    try {
        const deleteOneQuery = (id: string) => remove(ref(rtdb, `usersNotifications/${userId}/${id}`));

        ids.forEach(deleteOneQuery);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}
