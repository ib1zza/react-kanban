import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    browserLocalPersistence, getAuth, inMemoryPersistence, signInWithEmailAndPassword,
} from 'firebase/auth';

export const loginThunk = createAsyncThunk(
    'user/fetchByIdStatus',
    async (params: {email: string, password: string, remember: boolean}, thunkAPI) => {
        try {
            const auth = getAuth();

            if (params.remember) {
                await getAuth().setPersistence(browserLocalPersistence);
            } else {
                await getAuth().setPersistence(inMemoryPersistence);
            }
            signInWithEmailAndPassword(auth, params.email, params.password).then(async (userCredential) => {
                const { user } = userCredential;
                console.log(user);
                return user;
            }).catch((error) => {
                console.log(error.code);
                thunkAPI.rejectWithValue(error.code);
            });
        } catch (error: any) {
            thunkAPI.rejectWithValue(error);
            console.log(error.log);
        }
    },
);
