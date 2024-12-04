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
    shareStatus: false,
    isCreatingColumn: false,
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
            console.log(Object.values(state.selectedBoard.columns))
            state.selectedColumnId = Object.values(state.selectedBoard.columns).find(
                (col: any) => col.tasks && Object.keys(col.tasks).includes(action.payload.uid),
            )?.uid || '';
        },
        updateSelectedTask: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.selectedBoard) return;
            const task = state.selectedBoard.columns[state.selectedColumnId].tasks[id];
            state.selectedTask = task;
        },
        removeSelectedTask: (state) => {
            state.selectedTask = null;
            state.selectedColumnId = '';
        },
        setLinkedUsers: (state, action: PayloadAction<IUserInfo[]>) => {
            state.linkedUsersInfo = action.payload;
        },
        setShareStatus: (state, action: PayloadAction<boolean>) => {
            state.shareStatus = action.payload;
        },
        setIsCreatingColumn: (state, action: PayloadAction<boolean>) => {
            state.isCreatingColumn = action.payload;
        },
    },

});

export const { actions: boardCollectionActions } = boardCollectionSlice;
export const { reducer: boardCollectionReducer } = boardCollectionSlice;
