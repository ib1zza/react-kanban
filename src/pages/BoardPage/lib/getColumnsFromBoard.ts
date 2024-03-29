import { IBoard } from 'app/types/IBoard';

export const getColumnsFromBoard = (board: IBoard) => Object.values(board.columns || {}).sort(
    (a, b) => +a.timeCreated - +b.timeCreated,
);
