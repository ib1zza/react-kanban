import { StateSchema } from 'app/providers/StoreProvider';

export const getUserState = (state: StateSchema) => state.userInfo;
export const getUserName = (state: StateSchema) => state.userInfo.user?.displayName;
export const getUserEmail = (state: StateSchema) => state.userInfo.user?.email;
export const getUserAvatar = (state: StateSchema) => state.userInfo.user?.photoURL;
export const getUserUid = (state: StateSchema) => state.userInfo.user?.uid;
export const getUserSelect = (state: StateSchema) => state.userInfo.user?.select;
