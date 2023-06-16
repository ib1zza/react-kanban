import { deleteDoc, doc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import {updateDocument} from "./utils/updateDocument";

export const deleteColumn = async (
  boardId: string,
  // userId: string,
  columnId: string
) => {
  try {
    //TODO: check why this want to work
    await updateDocument("boards", boardId, {
      ["columns." + columnId]: deleteField(),
    })
    // await deleteDoc(doc(db, "boards", boardId, "columns", columnId));
    // await updateDocument("users", userId, {
    //     boardsIds: arrayRemove(boardId),
    // });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
