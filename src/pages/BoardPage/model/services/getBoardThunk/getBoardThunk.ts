import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserInfo } from 'app/types/IUserInfo';
import { subscribeToBoardById } from 'entities/Board/API/getBoardFromIdRt';
import { getUserInfo } from 'features/users';

import {
    browserLocalPersistence, getAuth, inMemoryPersistence, signInWithEmailAndPassword,
} from 'firebase/auth';
import { boardCollectionActions } from '../../slice/boardCollectionSlice';

export const getBoardThunk = createAsyncThunk(
    'boardCollection/getBoardThunk',
    async (params: {boardId: string, linkedUsersInfo: IUserInfo[]}, { rejectWithValue, dispatch }) => {
        subscribeToBoardById(params.boardId, async (board) => {
            dispatch(boardCollectionActions.setCurrentBoard(board));

            const isUsersEqual = (
                usersArr: IUserInfo[],
                usersIds: string[],
            ) => usersArr.length === usersIds.length && usersArr.map(
                (user) => user.uid,
            ).every(
                (id) => usersIds.includes(id),
            );
            const usersIds = Object.keys(board.users || {});
            if (!usersIds.length) return;
            if (isUsersEqual(params.linkedUsersInfo, usersIds)) return;

            const usersInfo = await Promise.allSettled(
                usersIds.map((userId) => getUserInfo(userId)),
            );
            const result = usersInfo.reduce((acc, el) => {
                if (el.status === 'fulfilled') {
                    acc.push(el.value);
                }
                return acc;
            }, [] as IUserInfo[]);
            // console.log(result);
            dispatch(boardCollectionActions.setLinkedUsers(result));
            // console.log(board);
        });

        // const auth = getAuth();
        // if (params.remember) {
        //     await getAuth().setPersistence(browserLocalPersistence);
        // } else {
        //     await getAuth().setPersistence(inMemoryPersistence);
        // }
        // return signInWithEmailAndPassword(auth, params.email, params.password).then(async (userCredential) => {
        //     const { user } = userCredential;

        //     return user;
        // }).catch((error: any) => rejectWithValue(error.code));
    },
);
