import { configureStore } from "@reduxjs/toolkit";
import suscriptionReducer from "./featuresSlices/SuscriptionSlice";

export const store = configureStore({
  reducer: {
    suscription: suscriptionReducer,
  },
});
