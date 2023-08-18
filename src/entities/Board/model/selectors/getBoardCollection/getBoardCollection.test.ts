import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getBoardCollection } from './getBoardCollection';

describe('getBoardCollection', () => {
    test('should return board collection', () => {
        const state: DeepPartial<StateSchema> = {
            boardCollection: {
                selectedBoardId: 'hello test',
                selectedColumnId: 'hello test',
                selectedBoard: null,
                selectedTask: null,
            },
        };
        expect(getBoardCollection(state as StateSchema)).toEqual({
            selectedBoardId: 'hello test',
            selectedColumnId: 'hello test',
            selectedBoard: null,
            selectedTask: null,
        });
    });
});
