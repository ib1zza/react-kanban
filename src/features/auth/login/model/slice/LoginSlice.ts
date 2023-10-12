import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { fetchByIdStatus } from '../services/loginThunk/fetchByIdStatus';

const initialState: LoginSchema = {
    isLoading: false,
    error: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchByIdStatus.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchByIdStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchByIdStatus.fulfilled, (state) => {
            state.isLoading = false;
        });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
