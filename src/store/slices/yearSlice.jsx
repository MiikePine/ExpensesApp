import { createSlice } from "@reduxjs/toolkit";

export const yearSlice = createSlice({
  name: "year",
  initialState: {
    value: "2023",
  },
  reducers: {
    setSelectedYear: (state, action) => {
      console.log("Setting selected year:", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setSelectedYear } = yearSlice.actions;

export default yearSlice.reducer;
