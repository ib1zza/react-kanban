import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, ITask } from '../../../../app/types/IBoard';
import { BoardCollectionSchema } from '../types/BoardCollectionSchema';

const initialState: BoardCollectionSchema = {
    selectedBoardId: '',
    selectedColumnId: '',
    selectedBoard: null,
    selectedTask: null,
};

export const boardCollectionSlice = createSlice({
    name: 'boardCollection',
    initialState,
    reducers: {
        setCurrentBoard: (state, action: PayloadAction<IBoard>) => {
            state.selectedBoard = action.payload;
            state.selectedBoardId = action.payload.uid;
            console.log('board selected:', action.payload);
        },
        removeSelectedBoard: (state) => {
            state.selectedBoard = null;
            state.selectedBoardId = '';
            console.log('board unselected:');
        },
        setCurrentTask: (state, action: PayloadAction<ITask>) => {
            state.selectedTask = action.payload;
            if (!state.selectedBoard) return;
            state.selectedColumnId = Object.values(state.selectedBoard.columns).find(
                (col) => Object.keys(col.tasks).includes(action.payload.uid),
            )?.uid || '';
            console.log('task selected:', action.payload);
        },
        removeSelectedTask: (state) => {
            state.selectedTask = null;
            state.selectedColumnId = '';
            console.log('task unselected:');
        },
    },
});

export const { actions: boardCollectionActions } = boardCollectionSlice;
export const { reducer: boardCollectionReducer } = boardCollectionSlice;
