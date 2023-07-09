import {  deleteField } from "firebase/firestore";
import { updateDocument } from "../../../users";

export const deleteColumn = async (
    boardId: string,
    // userId: string,
    columnId: string
) => {
    try {
        await updateDocument("boards", boardId, {
            ["columns." + columnId]: deleteField(),
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
