import { StateSchema } from 'app/providers/StoreProvider';
import { IUserInfo } from 'app/types/IUserInfo';

export const getLinkedUsers = (state: StateSchema) => state.boardCollection.linkedUsersInfo as IUserInfo[];
