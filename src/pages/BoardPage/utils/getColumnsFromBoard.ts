import { IBoard } from "../../../types/IBoard";

export const getColumnsFromBoard = (board: IBoard) => {
  return Object.values(board.columns).sort(
    (a, b) => +a.timeCreated - +b.timeCreated
  );
};
