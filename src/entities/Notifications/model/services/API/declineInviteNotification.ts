import {updateDocument} from "../../../../../features/users";
import {arrayRemove} from "firebase/firestore";
import { deleteNotification } from "./deleteNotification";


export async function declineInviteNotification(
    notificationId: string,
    userId: string,
    boardId: string
) {
    try {
        // если пользователь отклоняет приглашение, то
        // удаляем уведомление и удаляем его из списка гостей
        await deleteNotification(userId, notificationId);
        await updateDocument("boards", boardId, {
            "guestsAllowed": arrayRemove(userId),
            "usersAllowed": arrayRemove(userId),
        })
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}