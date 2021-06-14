import { configureStore } from "@reduxjs/toolkit";
import { betReducer } from "./slices/betSlice";

export default configureStore({
  reducer: {
    betSlice: betReducer,
  },
});
