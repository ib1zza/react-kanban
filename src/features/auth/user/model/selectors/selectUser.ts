import { StateSchema } from 'app/providers/StoreProvider';

export const selectUser = (state: StateSchema) => state.user.user;
