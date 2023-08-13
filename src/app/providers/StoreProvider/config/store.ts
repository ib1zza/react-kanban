import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notificationReducer } from '../../../../entities/Notifications';
import { boardCollectionReducer } from '../../../../entities/Board';
import { userInfoReducer } from '../../../../features/users/model/slice/userInfoSlice';
import { loginReducer } from '../../../../features/auth/login';
import { signupReducer } from '../../../../features/auth/signup';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore({
        reducer: {
            boardCollection: boardCollectionReducer,
            userInfo: userInfoReducer,
            notifications: notificationReducer,
            login: loginReducer,
            signup: signupReducer,
        },
        preloadedState: initialState,
    });
}
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
