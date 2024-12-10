import {IBoard, IBoardFromServer} from 'app/types/IBoardFromServer';

export const getColumnsFromBoard = (board: IBoard) => [...board.columns].sort(
    (a, b) => +a.timeCreated - +b.timeCreated,
);
