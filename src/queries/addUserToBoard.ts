import {updateDocument} from "./utils/updateDocument";
import {LinkedUserType} from "../types/IBoard";
import {arrayUnion} from "@firebase/firestore";

export const addUserToBoard = async (boardId:string, userId: string, userPermission: LinkedUserType) => {
    try {
        await updateDocument("boards", boardId, {
            [userPermission === LinkedUserType.USER ? "usersAllowed" : "guestsAllowed"]: arrayUnion(userId),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
