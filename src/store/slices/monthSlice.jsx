import { createSlice } from '@reduxjs/toolkit';

export const monthSlice = createSlice({
  name: 'month',
  initialState: {
    value: 'August',
  },
  reducers: {
    setSelectedMonth: (state, action) => {
      console.log('Setting selected month:', action.payload); 
      state.value = action.payload;
    },
  },
});

export const { setSelectedMonth } = monthSlice.actions;

export default monthSlice.reducer;