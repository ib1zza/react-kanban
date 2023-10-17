import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserInfo } from 'app/types/IUserInfo';
import { subscribeToBoardById } from 'entities/Board/API/getBoardFromIdRt';
import { getUserInfo } from 'features/users';
import { boardCollectionActions } from '../../slice/boardCollectionSlice';

export const getBoardThunk = createAsyncThunk(
    'boardCollection/getBoardThunk',
    async (params: {boardId: string, linkedUsersInfo: IUserInfo[]}, thunkApi) => {
        subscribeToBoardById(params.boardId, async (board) => {
            thunkApi.dispatch(boardCollectionActions.setCurrentBoard(board));
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
            const result = usersInfo.map((user: any) => user && user.value);
            thunkApi.dispatch(boardCollectionActions.setLinkedUsers(result));
        });
    },
);
