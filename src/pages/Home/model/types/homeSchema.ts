import {IBoard, IBoardSmallInfo} from 'app/types/IBoard';
import {IUserInfo} from "app/types/IUserInfo";

export interface HomeSchema {
    boards: IBoardSmallInfo[],
    usersLoaded: IUserInfo[],
    addBoardStatus: boolean,
    linkBoardStatus: boolean,
}
