import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { editColumn } from 'features/columns';

export interface IColumnForMoveInfo {
    direction: 'left' | 'right';
    colId: string;
    prevDisplayIndex: number;
}

export const moveColumnThunk = createAsyncThunk<any, IColumnForMoveInfo,
    { rejectValue: string, getState: StateSchema }>(
        'board/moveColumn',
        async (info, { getState, rejectWithValue }) => {
        // return;
            try {
                const { direction, colId, prevDisplayIndex } = info;

                // get selected board
                const { selectedBoard } = (getState() as StateSchema).boardCollection;

                if (!selectedBoard) {
                    return rejectWithValue('Error while moving column. No such board find');
                }

                const prevColumnId: string = (getState() as StateSchema).boardCollection.selectedColumnId;

                let colToSwap;

                if (direction === 'left') {
                    colToSwap = selectedBoard.columns.find((el) => el.displayIndex === prevDisplayIndex - 1);
                } else if (direction === 'right') {
                    colToSwap = selectedBoard.columns.find((el) => el.displayIndex === prevDisplayIndex + 1);
                } else {
                    return rejectWithValue('Error while moving column. No such direction');
                }

                if (!colToSwap) {
                    return rejectWithValue('Error while moving column. No such column find');
                }

                await Promise.all(
                    [
                        editColumn(selectedBoard.uid, colId, {
                            displayIndex: colToSwap.displayIndex,
                        }),

                        editColumn(selectedBoard.uid, colToSwap.uid, {
                            displayIndex: prevDisplayIndex,
                        }),
                    ],
                );
            } catch (e) {
                return rejectWithValue('error while getting notifications');
            }
        },
    );
