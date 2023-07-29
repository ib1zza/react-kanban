import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notificationReducer } from '../../../entities/Notifications/model/slice/notificationSlice';
import { boardCollectionReducer } from '../../../entities/Board/model/slice/boardCollectionSlice';
import { userInfoReducer } from '../../../features/users/model/slice/userInfoSlice';
import { loginReducer } from '../../../features/auth/login';
import { signupReducer } from '../../../features/auth/signup';

export const store = configureStore({
    reducer: {
        boardCollection: boardCollectionReducer,
        userInfo: userInfoReducer,
        notifications: notificationReducer,
        login: loginReducer,
        signup: signupReducer,
    },

});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
