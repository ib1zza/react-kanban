import { updateDocument } from "../../../users/API/updateDocument";
import { ITask } from "../../../../app/types/IBoard";

export async function editTask(
  boardId: string,
  columnId: string,
  taskId: string,
  newData: { [key in keyof ITask]?: ITask[key] }
) {
  const updatedData = Object.keys(newData).reduce(
    (acc: { [key: string]: any }, key: keyof ITask) => {
      acc["columns." + columnId + ".tasks." + taskId + "." + key] =
        newData[key];
      return acc;
    },
    {}
  );

  console.log(updatedData);

  return await updateDocument("boards", boardId, updatedData);
}
