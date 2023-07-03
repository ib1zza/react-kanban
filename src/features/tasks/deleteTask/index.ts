import { updateDocument } from "../../users/updateDocument";
import { deleteDoc, doc, arrayRemove, deleteField } from "firebase/firestore";
import { db } from "../../../firebase";

export const deleteTask = async (
  boardId: string,
  columnId: string,
  taskId: string
) => {
  try {
    console.log(boardId);
    // TODO: check why this does not work
    // await deleteDoc(
    //   doc(db, "boards", boardId, "columns", columnId, "tasks", taskId)
    // );

    await updateDocument("boards", boardId, {
      ["columns." + columnId + ".tasks." + taskId]: deleteField(),
    });

    // await updateDocument("users", userId, {
    //   boardsIds: arrayRemove(boardId),
    // });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;

  // TODO delete boardId from all users that invited to this board
  //     TODO delete chat when board is deleted
};
