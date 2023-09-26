import { createSlice } from '@reduxjs/toolkit';
import type { UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {
    user: null,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
