import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IBoardFromServer, ITask } from 'app/types/IBoardFromServer';

import { IUserInfo } from 'app/types/IUserInfo';
import { createTaskThunk } from 'pages/BoardPage/model/services/createTask/createTask';
import { BoardCollectionSchema } from '../types/BoardCollectionSchema';

const initialState: BoardCollectionSchema = {
    selectedBoardId: '',
    selectedColumnId: '',
    selectedBoard: null,
    selectedTask: null,
    shareStatus: false,
    isCreatingColumn: false,
    draggedTask: null,
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
            if (state.selectedTask?.uid === action.payload.uid) {
                state.selectedTask = null;
                state.selectedColumnId = '';
                return;
            }
            state.selectedTask = action.payload;
            if (!state.selectedBoard) return;
            state.selectedColumnId = state.selectedBoard.columns.find(
                (col) => col.tasks && col.tasks.find((t) => t.uid === action.payload.uid),
            )?.uid || '';
        },
        setDraggedTask: (state, action: PayloadAction<ITask>) => {
            state.draggedTask = action.payload;
            if (!state.selectedBoard) return;
            state.selectedColumnId = state.selectedBoard.columns.find(
                (col) => col.tasks && col.tasks.find((t) => t.uid === action.payload.uid),
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
        dragTask: (state, action: PayloadAction<string>) => {
            console.log(state.selectedBoard, state.selectedColumnId, state.draggedTask);
            const newColumnId = action.payload;
            console.log(state.selectedBoard, state.selectedColumnId, state.draggedTask);
            if (!state.selectedBoard || !state.selectedColumnId || !state.draggedTask) return;
            const foundColumn = state.selectedBoard.columns.find((col) => col.uid === state.selectedColumnId);
            console.log(foundColumn);

            if (!foundColumn) return;
            // @ts-ignore
            foundColumn.tasks = foundColumn.tasks.filter((t) => t.uid !== state.draggedTask.uid);
            console.log('pushing task');
            state.selectedBoard.columns.find((el) => el.uid === newColumnId)?.tasks.push(state.draggedTask);
        },
        removeSelectedTask: (state) => {
            state.selectedTask = null;
            state.selectedColumnId = '';
        },
        removeDraggedTask: (state) => {
            state.draggedTask = null;
            state.selectedColumnId = '';
        },
        setShareStatus: (state, action: PayloadAction<boolean>) => {
            state.shareStatus = action.payload;
        },
        setIsCreatingColumn: (state, action: PayloadAction<boolean>) => {
            state.isCreatingColumn = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTaskThunk.fulfilled, (state, action) => {

        });
    },

});

export const { actions: boardCollectionActions } = boardCollectionSlice;
export const { reducer: boardCollectionReducer } = boardCollectionSlice;
