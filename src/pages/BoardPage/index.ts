import { BoardPageAsync } from './ui/BoardPage.async';
import { boardCollectionActions, boardCollectionReducer } from './model/slice/boardCollectionSlice';
import type { BoardCollectionSchema } from './model/types/BoardCollectionSchema';
import { getBoardCollection } from './model/selectors/getBoardCollection/getBoardCollection';
import { getLinkedUsers } from './model/selectors/getLinkedUsers/getLinkedUsers';

export {
    BoardPageAsync as BoardPage, BoardCollectionSchema, boardCollectionReducer, boardCollectionActions,
    getBoardCollection, getLinkedUsers,
};
