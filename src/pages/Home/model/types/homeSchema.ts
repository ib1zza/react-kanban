import { IBoard } from 'app/types/IBoard';

export interface HomeSchema {
    boards: IBoard[]
    addBoardStatus: boolean,
    linkBoardStatus: boolean,
}
