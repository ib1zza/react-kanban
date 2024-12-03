import { StateSchema } from 'app/providers/StoreProvider';

export const getAllUsers = (state: StateSchema) => state.home.usersLoaded;
