import {db} from "../firebase";
import {updateDocument} from "./utils/updateDocument";
import {GuestPermission} from "../pages/Home";
import {arrayUnion, doc, setDoc} from "@firebase/firestore";
import {v4 as uuid} from "uuid";

export const createBoard = async (title: string, userId: string) => {
    try {
        const newBoardId = uuid();

        await setDoc(doc(db, "boards", newBoardId), {
            title: title,
            uid: newBoardId,
            //   chatId is optional, we'll create that later
            //   TODO: create chats functional then uncomment
            // chatId: "",
            columns: {},
            ownerId: userId,
            usersAllowed: [userId],
            guestPermissions: [GuestPermission.NONE],
            timeCreated: Date.now(),
            timeUpdated: Date.now(),
        });

        await updateDocument("users", userId, {
            boardsIds: arrayUnion(newBoardId),
        });

    } catch (e) {
        console.log(e);
        return false
    }
    return true;
}