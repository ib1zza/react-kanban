import { boardCollectionActions, boardCollectionReducer } from './model/slice/boardCollectionSlice';
import type { BoardCollectionSchema } from './model/types/BoardCollectionSchema';
import { getBoardCollection } from './model/selectors/getBoardCollection/getBoardCollection';
import { getLinkedUsers } from './model/selectors/getLinkedUsers/getLinkedUsers';
import BoardPage from './ui/BoardPage';

export {
    BoardPage, BoardCollectionSchema, boardCollectionReducer, boardCollectionActions,
    getBoardCollection, getLinkedUsers,
};
