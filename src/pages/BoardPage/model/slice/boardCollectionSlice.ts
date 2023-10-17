import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, ITask } from 'app/types/IBoard';

import { IUserInfo } from 'app/types/IUserInfo';
import { BoardCollectionSchema } from '../types/BoardCollectionSchema';
import { getBoardThunk } from '../services/getBoardThunk/getBoardThunk';

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
            console.log(state.selectedBoard);
        },
        updateSelectedTask: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (!state.selectedBoard) return;
            console.log('update task', id);
            const task = state.selectedBoard.columns[state.selectedColumnId].tasks[id];
            state.selectedTask = task;

            // state.selectedTask = state.selectedBoard.columns[state.selectedColumnId].tasks[action.payload.uid];
            // state.selectedBoard.columns[state.selectedColumnId].tasks[action.payload.uid] = action.payload;
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
