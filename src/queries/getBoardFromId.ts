import { getBoard } from "./getBoard";
import {IBoard} from "../types/IBoard";

export const getBoardFromId = (boardId: string) => {
  return getBoard(boardId).then((board) => {
    return board as IBoard;
  });
};
