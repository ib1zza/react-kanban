import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IBoard, IBoardFromServer} from 'app/types/IBoardFromServer';
import { HomeSchema } from '../types/homeSchema';
import {IUserInfo} from "app/types/IUserInfo";

const initialState: HomeSchema = {
    boards: [],
    usersLoaded: [],
    addBoardStatus: false,
    linkBoardStatus: false,
};

export const HomeSlice = createSlice({
    name: 'boardCollection',
    initialState,
    reducers: {
        addBoards: (state, action: PayloadAction<IBoard[]>) => {
            state.boards = action.payload;
        },
        setAddBoardStatus: (state, action: PayloadAction<boolean>) => {
            state.addBoardStatus = action.payload;
        },
        setLinkBoardStatus: (state, action: PayloadAction<boolean>) => {
            state.addBoardStatus = action.payload;
        },
        addUsers: (state, action: PayloadAction<IUserInfo | IUserInfo[]>) => {
            if (Array.isArray(action.payload)) {
                state.usersLoaded.push(...action.payload);
            } else {
                state.usersLoaded.push(action.payload);
            }
        }
    },
});

export const { actions: homeActions } = HomeSlice;
export const { reducer: homeReducer } = HomeSlice;
