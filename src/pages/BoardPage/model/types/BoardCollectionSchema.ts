import { IBoard, ITask } from 'app/types/IBoardFromServer';

export interface BoardCollectionSchema {
    selectedBoardId: string;
    selectedColumnId: string;
    selectedBoard: IBoard | null;
    selectedTask: ITask | null;
    shareStatus: boolean;
    isCreatingColumn: boolean;
    draggedTask: ITask | null;
  }

