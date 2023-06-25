import { getBoard } from "../../../queries/getBoard";
import { setCurrentBoard } from "../../../store/Reducers/boardCollectionSlice";

export const getBoardFromId = (
  boardId: string,
  dispatch: (res: any) => void
) => {
  if (!boardId) return;
  return getBoard(boardId).then((board) => {
    dispatch(setCurrentBoard(board));
    return board;
  });
};
