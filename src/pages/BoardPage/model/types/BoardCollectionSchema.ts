import {IBoard, IBoardFromServer, ITask} from 'app/types/IBoardFromServer';
import { IUserInfo } from 'app/types/IUserInfo';

export interface BoardCollectionSchema {
    selectedBoardId: string;
    selectedColumnId: string;
    selectedBoard: IBoard | null;
    selectedTask: ITask | null;
    shareStatus: boolean;
    isCreatingColumn: boolean;
  }
