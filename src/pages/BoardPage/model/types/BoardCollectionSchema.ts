import { IBoard, ITask } from 'app/types/IBoard';
import { IUserInfo } from 'app/types/IUserInfo';

export interface BoardCollectionSchema {
    selectedBoardId: string;
    selectedColumnId: string;
    selectedBoard: IBoard | null;
    selectedTask: ITask | null;
    linkedUsersInfo: IUserInfo[],
    shareStatus: boolean;
    isCreatingColumn: boolean;
  }
