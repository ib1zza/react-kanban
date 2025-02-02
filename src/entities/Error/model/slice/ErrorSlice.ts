import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorSchema } from '../types';

const initialState: ErrorSchema = {
    error: '',
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = '';
        },
    },
    extraReducers: (builder) => {},
});

export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
