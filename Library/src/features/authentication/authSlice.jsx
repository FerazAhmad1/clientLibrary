import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  token: "",
  email: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state = initialState, action) => {
      state.isLoggedin = !!action.payload.token;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.token = "";
      state.email = "";
      state.role = "";
    },
  },
});
export const authState = (state) => state.auth;
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
