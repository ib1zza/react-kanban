import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    browserLocalPersistence, getAuth, inMemoryPersistence, signInWithEmailAndPassword,
} from 'firebase/auth';

export const fetchByIdStatus = createAsyncThunk(
    'user/fetchByIdStatus',
    async (params: {email: string, password: string, remember: boolean}, { rejectWithValue }) => {
        const auth = getAuth();
        if (params.remember) {
            await getAuth().setPersistence(browserLocalPersistence);
        } else {
            await getAuth().setPersistence(inMemoryPersistence);
        }
        return signInWithEmailAndPassword(auth, params.email, params.password).then(async (userCredential) => {
            // const { user } = userCredential;
            // return user;
        }).catch((error: any) => rejectWithValue(error.code));
    },
);
