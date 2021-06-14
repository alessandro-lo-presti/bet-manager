import { configureStore } from "@reduxjs/toolkit";
import { betReducer } from "./slices/betSlice";
import { BettingSlipReducer } from "./slices/bettingSlipSlice";
import { detailsBetReducer } from "./slices/detailsBetSlice";

export default configureStore({
  reducer: {
    betSlice: betReducer,
    detailsBetSlice: detailsBetReducer,
    bettingSlipSlice: BettingSlipReducer,
  },
});
