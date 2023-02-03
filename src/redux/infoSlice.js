import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { addInfo } = infoSlice.actions;

export default infoSlice.reducer;
