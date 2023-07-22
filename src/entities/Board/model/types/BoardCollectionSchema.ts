import { IBoard, ITask } from "../../../../app/types/IBoard";

export interface BoardCollectionSchema {
    selectedBoardId: string;
    selectedColumnId: string;
    selectedBoard: IBoard | null;
    selectedTask: ITask | null;
  }