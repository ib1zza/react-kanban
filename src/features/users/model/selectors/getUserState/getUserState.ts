import { StateSchema } from '../../../../../app/providers/StoreProvider';

export const getUserState = (state: StateSchema) => state.userInfo;
