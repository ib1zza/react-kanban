import { updateDocument } from "../../users/updateDocument";
import { v4 as uuid } from "uuid";

export const createColumn = async (
  title: string,
  color: string,
  boardId: string
) => {
  try {
    const newColumnId = uuid();
    await updateDocument("boards", boardId, {
      ["columns." + newColumnId]: {
        uid: newColumnId,
        title: title,
        tasks: {},
        timeCreated: Date.now(),
        timeUpdated: Date.now(),
        color: color,
      },
    });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
