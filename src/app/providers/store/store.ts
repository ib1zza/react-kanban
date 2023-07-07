import { configureStore } from "@reduxjs/toolkit";
import boardCollectionReducer from "./Reducers/boardCollectionSlice";
import userInfoReducer from "./Reducers/userInfoSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import notificationsReducer from "./Reducers/notificationSlice";
export const store = configureStore({
  reducer: {
    boardCollection: boardCollectionReducer,
    userInfo: userInfoReducer,
    notifications: notificationsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector