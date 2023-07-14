import {updateDocument} from "../../../features/users";
import {arrayUnion} from "@firebase/firestore";


export async function addToBoardInvitedIds(userId: string, boardId: string) {
    try {
        await updateDocument("users", userId, {
            "boardInvitedIds": arrayUnion(boardId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}