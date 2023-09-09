import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalIncoming: 0,
};

const sumincSlice = createSlice({
  name: "suminc",
  initialState,
  reducers: {
    updateTotalIncoming: (state, action) => {
      state.totalIncoming = action.payload;
    },
  },
});

export const { updateTotalIncoming } = sumincSlice.actions;

export default sumincSlice.reducer;
