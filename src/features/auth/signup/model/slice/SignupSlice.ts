import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SignupSchema } from '../types/SignupSchema';

const initialState: SignupSchema = {
    isLoading: false,
    error: '',
    progress: 0,
    step: 1,
};

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload;
        },
    },
});

export const { actions: signupActions } = signupSlice;
export const { reducer: signupReducer } = signupSlice;
