import { createAsyncThunk } from '@reduxjs/toolkit';
import {createTaskRt, ITaskForCreate} from "features/tasks/API/createTask/createTaskRt";
import {StateSchema} from "app/providers/StoreProvider";
import {editTask} from "features/tasks";
import {IColumn} from "app/types/IBoardFromServer";

export const createTaskThunk = createAsyncThunk<any, ITaskForCreate, { rejectValue: string, getState: StateSchema }>(
    'board/createTask',
    async (task, { getState, rejectWithValue }) => {
        try {
            const selectedBoard = (getState() as StateSchema).boardCollection.selectedBoard;

            if (!selectedBoard) {
                return rejectWithValue('Error while creating task. No such board find');
            }

            const taskColumn: IColumn | undefined = selectedBoard.columns.find(el => el.uid === task.columnId);

            if (!taskColumn) {
                return rejectWithValue('Error while creating task. No such column find');
            }

            const newTask = await createTaskRt(task);

            // update all other tasks positions
            if (taskColumn.tasks.length) {
                return await Promise.allSettled(taskColumn.tasks.map((task) => editTask(selectedBoard.uid, taskColumn.uid, task.uid, {
                    ...task,
                    displayId: task.displayId + 1,
                })));
            }

        } catch (e) {
            console.log(e);
            return rejectWithValue('error while getting notifications');
        }
    },
);
