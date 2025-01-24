import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { deleteTask, editTask } from 'features/tasks';
import { IColumn } from 'app/types/IBoardFromServer';
import { deleteColumn, editColumn } from 'features/columns';

export interface IColumnForDeleteInfo {
    columnId: string;
    displayId: number;
}

export const deleteColumnThunk = createAsyncThunk<any, IColumnForDeleteInfo, {
    rejectValue: string,
    getState: StateSchema
}>(
    'board/deleteColumn',
    async (info, { getState, rejectWithValue }) => {
        // return;
        try {
            const { columnId, displayId } = info;

            // get selected board
            const { selectedBoard } = (getState() as StateSchema).boardCollection;

            if (!selectedBoard) {
                return rejectWithValue('Error while creating task. No such board find');
            }

            const postColumns = selectedBoard.columns.filter((el) => el.displayIndex >= displayId);

            if (postColumns.length) {
                await Promise.allSettled(postColumns
                    .map((col) => editColumn(selectedBoard.uid, col.uid, {
                        displayIndex: col.displayIndex - 1,
                    })));
            }

            await deleteColumn(selectedBoard.uid, columnId);
        } catch (e) {
            console.log(e);
            return rejectWithValue('error while getting notifications');
        }
    },
);
