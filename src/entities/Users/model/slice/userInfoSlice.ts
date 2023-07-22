import { createSlice } from '@reduxjs/toolkit';
import { UserInfoSchema } from '../types/UserInfoSchema';

const initialState: UserInfoSchema = {
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

export const { actions: userInfoActions } = userInfoSlice;
export const { reducer: userInfoReducer } = userInfoSlice;
