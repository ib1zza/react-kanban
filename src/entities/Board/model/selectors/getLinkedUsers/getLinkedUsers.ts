import { StateSchema } from 'app/providers/StoreProvider';

export const getLinkedUsers = (state: StateSchema) => state.boardCollection.linkedUsersInfo;
