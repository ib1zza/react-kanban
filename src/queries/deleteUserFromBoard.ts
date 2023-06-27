import {updateDocument} from "./utils/updateDocument";
import {LinkedUserType} from "../types/IBoard";
import {arrayRemove} from "firebase/firestore";

export const deleteUserFromBoard = async (boardId:string, userId: string, userPermission: LinkedUserType) => {
    try {
        await updateDocument("boards", boardId, {
            [userPermission === LinkedUserType.USER ? "usersAllowed" : "guestsAllowed"]: arrayRemove(userId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
