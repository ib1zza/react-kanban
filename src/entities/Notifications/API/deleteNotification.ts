import {deleteDoc, deleteField, doc} from "firebase/firestore";
import {db} from "../../../firebase";
import {updateDocument} from "../../../features/users";

export const deleteNotification = async (
    userId: string,
    notificationId: string,
) => {
    try {
        await updateDocument("notifications", userId, {
            [notificationId]: deleteField(),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
