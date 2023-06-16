import { createSlice } from "@reduxjs/toolkit";
import { FirebaseUserInfo } from "../../queries/getUserInfo";

export interface userInfoState {
  user: FirebaseUserInfo | null;
}

const initialState: userInfoState = {
  user: null,
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
