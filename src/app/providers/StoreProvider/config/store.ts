import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardCollectionReducer } from 'pages/BoardPage';
import { homeReducer } from 'pages/Home/model/slice/HomeSlice';
import { notificationReducer } from 'entities/Notifications';
import { userInfoReducer } from 'features/users/model/slice/userInfoSlice';
import { loginReducer } from 'features/auth/login';
import { signupReducer } from 'features/auth/signup';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore({
        reducer: {
            boardCollection: boardCollectionReducer,
            userInfo: userInfoReducer,
            notifications: notificationReducer,
            login: loginReducer,
            signup: signupReducer,
            home: homeReducer,
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
        home: homeReducer,

    },

});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
