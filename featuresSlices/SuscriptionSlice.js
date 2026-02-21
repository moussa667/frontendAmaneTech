import { createSlice } from "@reduxjs/toolkit";

export const suscriptionSlice = createSlice({
  name: "suscription",
  initialState: {
    type: null,
    isPremium: false,
  },
  reducers: {
    setSuscriptionType: (state, action) => {
      state.type = action.payload;
      state.isPremium = action.payload === "Premium";
    },
  },
});

export const { setSuscriptionType } = suscriptionSlice.actions;

export default suscriptionSlice.reducer;
