import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from 'app/types/IBoard';
import { HomeSchema } from '../types/homeSchema';

const initialState: HomeSchema = {
    boards: [],
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
    },
});

export const { actions: homeActions } = HomeSlice;
export const { reducer: homeReducer } = HomeSlice;
