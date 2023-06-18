import { configureStore } from "@reduxjs/toolkit";
import boardCollectionReducer from "./Reducers/boardCollectionSlice";
import userInfoReducer from "./Reducers/userInfoSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    boardCollection: boardCollectionReducer,
    userInfo: userInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
