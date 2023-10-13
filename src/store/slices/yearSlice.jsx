import { createSlice } from "@reduxjs/toolkit";

export const yearSlice = createSlice({
  name: "year",
  initialState: {
    value: "2023",
    // totalYearIncoming: 0, // Adicione o totalYearIncoming ao estado inicial
  },
  reducers: {
    setSelectedYear: (state, action) => {
      state.value = parseInt(action.payload); // Convert to numeric value
    },
    updateTotalYearIncoming: (state, action) => {
      state.totalYearIncoming = action.payload; // Atualize o totalYearIncoming com o novo valor
    },
  },
});

export const { setSelectedYear, updateTotalYearIncoming } = yearSlice.actions;

export default yearSlice.reducer;