import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { loginThunk } from '../services/loginThunk/loginThunk';

const initialState: LoginSchema = {
    isLoading: false,
    rememberMe: false,
    error: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.rejected, (state, action) => {
            console.log(action.payload);
            state.error = action.payload as string;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(loginThunk.pending, (state, action) => {
            console.log(action.payload);
        });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
