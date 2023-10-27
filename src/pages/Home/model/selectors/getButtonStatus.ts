import { StateSchema } from 'app/providers/StoreProvider';

export const getAddBoardStatus = (state: StateSchema) => state.home?.addBoardStatus || false;
export const getLinkBoardStatus = (state: StateSchema) => state.home?.linkBoardStatus || false;
