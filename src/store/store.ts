import { configureStore } from "@reduxjs/toolkit";
import addBoardReducer from "./Reducers/addBoardSlice";
import boardCollectionReducer from "./Reducers/boardCollectionSlice";
export const store = configureStore({
  reducer: {
    addBoard: addBoardReducer,
    boardCollection: boardCollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
