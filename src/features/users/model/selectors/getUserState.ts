import { StateSchema } from '../../../../app/providers/store';

export const getUserState = (state: StateSchema) => state.userInfo;
