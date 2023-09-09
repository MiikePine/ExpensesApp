import { createSlice } from "@reduxjs/toolkit";

const expSlice = createSlice({
  name: "exp",
  initialState: [],
  reducers: {
    setExp: (state, action) => {
      return [...state, action.payload];
    },
    // You can add other reducer actions here if needed
  },
});

export const { setExp } = expSlice.actions;

export default expSlice.reducer;
