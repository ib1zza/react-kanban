import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { deleteTask, editTask } from 'features/tasks';
import { IColumn } from 'app/types/IBoardFromServer';
import { boardCollectionActions } from 'pages/BoardPage';

export interface ITaskForDeleteInfo {
    columnId: string;
    taskId: string;
    displayId: number;
}

export const deleteTaskThunk = createAsyncThunk<any, ITaskForDeleteInfo, {
    rejectValue: string,
    getState: StateSchema
}>(
    'board/deleteTask',
    async (info, { getState, rejectWithValue, dispatch }) => {
        // return;
        try {
            const { columnId, taskId, displayId } = info;

            // get selected board
            const { selectedBoard, selectedTask } = (getState() as StateSchema).boardCollection;

            if (!selectedBoard) {
                return rejectWithValue('Error while creating task. No such board find');
            }

            const prevColumnId: string = (getState() as StateSchema).boardCollection.selectedColumnId;

            const prevColumn: IColumn | undefined = selectedBoard.columns.find((el) => el.uid === columnId);

            if (!prevColumnId || !prevColumn) {
                return rejectWithValue('Error while creating task. No such column find');
            }

            console.log(displayId, prevColumn.tasks
                .filter((t) => t.displayId > displayId), taskId);
            // remove task from old column
            await Promise.allSettled(prevColumn.tasks
                .filter((t) => t.displayId > displayId)
                .map((task) => editTask(selectedBoard.uid, columnId, task.uid, {
                    displayId: task.displayId - 1,
                })));

            await deleteTask(selectedBoard.uid, columnId, taskId);

            if (taskId === selectedTask?.uid) {
                dispatch(boardCollectionActions.removeSelectedTask());
            }
        } catch (e) {
            console.log(e);
            return rejectWithValue('error while getting notifications');
        }
    },
);
