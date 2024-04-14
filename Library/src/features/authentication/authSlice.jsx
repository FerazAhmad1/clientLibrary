import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  token: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = !!action.payload.token;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.token = "";
      state.email = "";
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
