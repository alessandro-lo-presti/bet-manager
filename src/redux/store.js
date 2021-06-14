import { configureStore } from "@reduxjs/toolkit";
import { betReducer } from "./slices/betSlice";
import { detailsBetReducer } from "./slices/detailsBetSlice";

export default configureStore({
  reducer: {
    betSlice: betReducer,
    detailsBetSlice: detailsBetReducer,
  },
});
