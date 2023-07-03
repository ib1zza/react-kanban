import { updateDocument } from "../../users/updateDocument";

export const toggleTaskComplete = async (
  taskId: string,
  columnId: string,
  boardId: string,
  newStatus: boolean
) => {
  return await updateDocument("boards", boardId, {
    ["columns." + columnId + ".tasks." + taskId + ".isCompleted"]: newStatus,
  });
};
