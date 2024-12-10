import {IBoard, IBoardFromServer, IBoardSmallInfoFromServer} from 'app/types/IBoardFromServer';
import {IUserInfo} from "app/types/IUserInfo";

export interface HomeSchema {
    boards: IBoard[],
    usersLoaded: IUserInfo[],
    addBoardStatus: boolean,
    linkBoardStatus: boolean,
}
