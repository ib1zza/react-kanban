import { createSlice } from "@reduxjs/toolkit";

export interface addBoardState {
  opened: boolean;
}

const initialState: addBoardState = {
  opened: false,
};

export const addBoardSlice = createSlice({
  name: "addBoard",
  initialState,
  reducers: {
    addBoardFalse: (state) => {
      state.opened = false;
    },
    addBoardTrue: (state) => {
      state.opened = true;
    },
  },
});

export const { addBoardFalse, addBoardTrue } = addBoardSlice.actions;

export default addBoardSlice.reducer;
