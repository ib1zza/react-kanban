import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IBoardFromServer, ITask } from 'app/types/IBoardFromServer';

import { IUserInfo } from 'app/types/IUserInfo';
import { BoardCollectionSchema } from '../types/BoardCollectionSchema';

const initialState: BoardCollectionSchema = {
    selectedBoardId: '',
    selectedColumnId: '',
    selectedBoard: null,
    selectedTask: null,
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
            state.selectedTask = null;
            state.selectedColumnId = '';
        },
        setCurrentTask: (state, action: PayloadAction<ITask>) => {
            state.selectedTask = action.payload;
            if (!state.selectedBoard) return;
            console.log(Object.values(state.selectedBoard.columns));
            state.selectedColumnId = state.selectedBoard.columns.find(
                (col) =>
                    col.tasks && col.tasks.find((t) =>
                        t.uid === action.payload.uid)
            )?.uid || '';
        },
        updateSelectedTask: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.selectedBoard || !state.selectedColumnId) return;
            const foundColumn = state.selectedBoard.columns.find((col) => col.uid === state.selectedColumnId);
            if (!foundColumn) return;
            const foundTask = foundColumn.tasks.find((t) => t.uid === id);
            if (!foundTask) return;
            state.selectedTask = foundTask;
        },
        removeSelectedTask: (state) => {
            state.selectedTask = null;
            state.selectedColumnId = '';
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
