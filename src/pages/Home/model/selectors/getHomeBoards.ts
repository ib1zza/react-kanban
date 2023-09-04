import { StateSchema } from 'app/providers/StoreProvider';

export const getHomeBoards = (state: StateSchema) => state.home?.boards || [];
