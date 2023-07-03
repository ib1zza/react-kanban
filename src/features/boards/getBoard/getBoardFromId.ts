import { getBoard } from ".";
import { IBoard } from "../../../app/types/IBoard";

export const getBoardFromId = (boardId: string) => {
  return getBoard(boardId).then((board) => {
    return board as IBoard;
  });
};
