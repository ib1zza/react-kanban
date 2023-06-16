import { configureStore } from "@reduxjs/toolkit";
import boardCollectionReducer from "./Reducers/boardCollectionSlice";
import userInfoReducer from "./Reducers/userInfoSlice";
export const store = configureStore({
  reducer: {
    boardCollection: boardCollectionReducer,
    userInfo: userInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
