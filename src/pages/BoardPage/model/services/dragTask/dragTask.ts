import {createAsyncThunk} from '@reduxjs/toolkit';
import {StateSchema} from "app/providers/StoreProvider";
import {deleteTask, editTask} from "features/tasks";
import {IColumn} from "app/types/IBoardFromServer";
import {createTaskRt} from "features/tasks/API/createTask/createTaskRt";

export interface ITaskForDragInfo {
    newColumnId: string;
    newDisplayId: number;
}

export const dragTaskThunk = createAsyncThunk<any, ITaskForDragInfo, { rejectValue: string, getState: StateSchema }>(
    'board/dragTask',
    async (info, {getState, rejectWithValue}) => {
        // return;
        try {
            const {newColumnId, newDisplayId} = info;

            // get selected board
            const selectedBoard = (getState() as StateSchema).boardCollection.selectedBoard;

            if (!selectedBoard) {
                return rejectWithValue('Error while creating task. No such board find');
            }

            const prevColumnId: string = (getState() as StateSchema).boardCollection.selectedColumnId;

            const prevColumn: IColumn | undefined = selectedBoard.columns.find(el => el.uid === prevColumnId);

            if (!prevColumnId || !prevColumn) {
                return rejectWithValue('Error while creating task. No such column find');
            }

            const draggedTask = (getState() as StateSchema).boardCollection.draggedTask;

            if (!draggedTask) {
                return rejectWithValue('Error while creating task. No such task find');
            }

            const newColumn: IColumn | undefined = selectedBoard.columns.find(el => el.uid === newColumnId);

            if (!newColumn) {
                return rejectWithValue('Error while creating task. No such new column find');
            }

            if (newColumnId === prevColumnId) {
                // just need to update displayId
                if (newDisplayId === draggedTask.displayId) {
                    return;
                }
                console.log(newDisplayId, draggedTask.displayId)
                if (newDisplayId === -1) {
                    console.log("here")
                    await Promise.allSettled(prevColumn.tasks
                        .filter(t => t.uid !== draggedTask.uid && t.displayId >= draggedTask.displayId)
                        .map((task) => editTask(selectedBoard.uid, prevColumnId, task.uid, {
                            ...task,
                            displayId: task.displayId - 1,
                        })));

                    return await editTask(selectedBoard.uid, prevColumnId, draggedTask.uid, {
                        ...draggedTask,
                        displayId: prevColumn.tasks.length - 1,
                    });
                }

                if (newDisplayId > draggedTask.displayId) {
                    if (newDisplayId - draggedTask.displayId === 1) {
                        return;
                    }

                    console.log("there")
                    await Promise.allSettled(prevColumn.tasks
                        .filter(t => t.uid !== draggedTask.uid && t.displayId > draggedTask.displayId && t.displayId < newDisplayId)
                        .map((task) => editTask(selectedBoard.uid, prevColumnId, task.uid, {
                            ...task,
                            displayId: task.displayId - 1,
                        })));

                    await editTask(selectedBoard.uid, prevColumnId, draggedTask.uid, {
                        ...draggedTask,
                        displayId: newDisplayId - 1,
                    });

                    return;
                }

                if (newDisplayId < draggedTask.displayId) {
                    console.log('hello')

                    await Promise.allSettled(prevColumn.tasks
                        .filter(t => t.uid !== draggedTask.uid && t.displayId >= newDisplayId && t.displayId < draggedTask.displayId)
                        .map((task) => editTask(selectedBoard.uid, prevColumnId, task.uid, {
                            ...task,
                            displayId: task.displayId + 1,
                        })));

                    return   await editTask(selectedBoard.uid, prevColumnId, draggedTask.uid, {
                        ...draggedTask,
                        displayId: newDisplayId,
                    });
                }
            } else {
                // remove task from old column
                await Promise.allSettled(prevColumn.tasks
                    .filter(t => t.uid !== draggedTask.uid && t.displayId >= draggedTask.displayId)
                    .map((task) => editTask(selectedBoard.uid, prevColumnId, task.uid, {
                        ...task,
                        displayId: task.displayId - 1,
                    })));

                await deleteTask(selectedBoard.uid, prevColumnId, draggedTask.uid);


                await createTaskRt({
                    ...draggedTask,
                    columnId: newColumnId,
                    boardId: selectedBoard.uid,
                    displayId: newDisplayId === -1 ? newColumn.tasks.length : newDisplayId,
                })

                if (newDisplayId !== -1) {

                    await Promise.allSettled(newColumn.tasks
                        .filter(t => t.displayId >= newDisplayId)
                        .map((task) => editTask(selectedBoard.uid, newColumnId, task.uid, {
                            ...task,
                            displayId: task.displayId + 1,
                        })));
                }


            }

        } catch (e) {
            console.log(e);
            return rejectWithValue('error while getting notifications');
        }
    },
);
