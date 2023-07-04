import { db } from "../../../../firebase";
import { updateDocument } from "../../../users/API/updateDocument";

import { arrayUnion, doc, setDoc } from "@firebase/firestore";
import { v4 as uuid } from "uuid";
import { GuestPermission } from "../../../../app/types/IBoard";

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
      usersAllowed: [],
      guestsAllowed: [],
      guestPermissions: [GuestPermission.NONE],
      timeCreated: Date.now(),
      timeUpdated: Date.now(),
    });

    await updateDocument("users", userId, {
      boardsIds: arrayUnion(newBoardId),
    });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
