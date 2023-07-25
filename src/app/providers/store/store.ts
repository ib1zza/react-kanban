import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notificationReducer } from '../../../entities/Notifications/model/slice/notificationSlice';
import { boardCollectionReducer } from '../../../entities/Board/model/slice/boardCollectionSlice';
import { userInfoReducer } from '../../../entities/Users/model/slice/userInfoSlice';
import { loginReducer } from '../../../features/auth/login/model/slice/LoginSlice';

export const store = configureStore({
    reducer: {
        boardCollection: boardCollectionReducer,
        userInfo: userInfoReducer,
        notifications: notificationReducer,
        login: loginReducer,
    },
});

type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
