import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteColumn = async (
  boardId: string,
  userId: string,
  columnId: string
) => {
  try {
    //TODO: check why this want to work
    await deleteDoc(doc(db, "boards", boardId, "columns", columnId));
    // await updateDocument("users", userId, {
    //     boardsIds: arrayRemove(boardId),
    // });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
