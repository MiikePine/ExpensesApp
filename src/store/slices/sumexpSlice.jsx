import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalExpense: 0,
};

 const sumexpSlice = createSlice({
  name: 'sumexp',
  initialState,
  reducers: {
 
    updateTotalExpense: (state, action) => {
      state.totalExpense = action.payload;
    },
  },
});

export const { updateTotalExpense } = sumexpSlice.actions;

export default sumexpSlice.reducer;