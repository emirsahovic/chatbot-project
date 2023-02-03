import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "../redux/infoSlice";

export const store = configureStore({
  reducer: {
    info: infoReducer,
  },
});
