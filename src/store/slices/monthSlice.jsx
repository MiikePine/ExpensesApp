import { createSlice } from '@reduxjs/toolkit';

export const monthSlice = createSlice({
  name: 'month',
  initialState: {
    value: 'Julho',
  },
  reducers: {
    setSelectedMonth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedMonth } = monthSlice.actions;

export default monthSlice.reducer;