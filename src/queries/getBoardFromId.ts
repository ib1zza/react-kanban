import { getBoard } from "./getBoard";

export const getBoardFromId = (boardId: string) => {
  if (!boardId) return [];
  return getBoard(boardId).then((board) => {
    return board;
  });
};
