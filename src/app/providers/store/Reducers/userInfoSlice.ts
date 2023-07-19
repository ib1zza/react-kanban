import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../../../types/User';

export interface userInfoState {
  user: IUserInfo | null;
}

const initialState: userInfoState = {
    user: null,
};

export const userInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
