import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log("Dados do usuário recebidos:", action.payload);
      return action.payload; // Definir o novo estado com os dados do usuário
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;