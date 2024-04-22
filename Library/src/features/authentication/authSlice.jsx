import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("initialState")) || {
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
      const isLoggedin = (state.isLoggedin = !!action.payload.token);
      const token = (state.token = action.payload.token);
      const email = (state.email = action.payload.email);
      const role = (state.role = action.payload.role);
      localStorage.setItem(
        "initialState",
        JSON.stringify({ isLoggedin, token, email, role })
      );
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.token = "";
      state.email = "";
      state.role = "";
      localStorage.clear();
    },
  },
});
export const authState = (state) => state.auth;
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
