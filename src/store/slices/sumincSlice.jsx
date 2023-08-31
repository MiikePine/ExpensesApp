import { createSlice } from '@reduxjs/toolkit';

const sumincSlice = createSlice({
  name: 'suminc',
  initialState: { totalIncome: 0 }, 
  reducers: {
    updateTotalIncome: (state, action) => {
      state.totalIncome = action.payload;
    },
  },
});

export const { updateTotalIncome } = sumincSlice.actions;

export default sumincSlice.reducer;