import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, ITask } from 'app/types/IBoard';

import { IUserInfo } from 'app/types/IUserInfo';
import { BoardCollectionSchema } from '../types/BoardCollectionSchema';

const initialState: BoardCollectionSchema = {
    selectedBoardId: '',
    selectedColumnId: '',
    selectedBoard: null,
    selectedTask: null,
    linkedUsersInfo: [],
};

export const boardCollectionSlice = createSlice({
    name: 'boardCollection',
    initialState,
    reducers: {
        setCurrentBoard: (state, action: PayloadAction<IBoard>) => {
            state.selectedBoard = action.payload;
            state.selectedBoardId = action.payload.uid;
        },
        removeSelectedBoard: (state) => {
            state.selectedBoard = null;
            state.selectedBoardId = '';
            state.linkedUsersInfo = [];
        },
        setCurrentTask: (state, action: PayloadAction<ITask>) => {
            state.selectedTask = action.payload;
            if (!state.selectedBoard) return;
            state.selectedColumnId = Object.values(state.selectedBoard.columns).find(
                (col: any) => Object.keys(col.tasks).includes(action.payload.uid),
            )?.uid || '';
        },
        removeSelectedTask: (state) => {
            state.selectedTask = null;
            state.selectedColumnId = '';
        },
        setLinkedUsers: (state, action: PayloadAction<IUserInfo[]>) => {
            state.linkedUsersInfo = action.payload;
        },
    },
});

export const { actions: boardCollectionActions } = boardCollectionSlice;
export const { reducer: boardCollectionReducer } = boardCollectionSlice;
