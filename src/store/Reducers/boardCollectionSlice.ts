import { createSlice } from "@reduxjs/toolkit";

export interface boardCollectionState {
  name: string;
  columns: any[];
}

const initialState: boardCollectionState = {
  name: "",
  columns: [],
};

export const boardCollectionSlice = createSlice({
  name: "boardCollection",
  initialState,
  reducers: {
    setBoardName: (state, action) => {
      state.name = action.payload;
    },
    setBoardColumns: (state, action) => {
      state.columns = action.payload;
      console.log(state.columns);
    },
  },
});

export const { setBoardName, setBoardColumns } = boardCollectionSlice.actions;

export default boardCollectionSlice.reducer;
