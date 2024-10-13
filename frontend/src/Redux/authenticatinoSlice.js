import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  userData: sessionStorage.getItem("userToken") || null,
  decodedToken: null,
};

export const authSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    saveUserData(state, action) {
      // Store the token passed from the action
      const token = action.payload;
      state.userData = token;
      sessionStorage.setItem("userToken", token);
      state.decodedToken = jwtDecode(token);
    },
    clearUserData(state) {
      // Clear the token
      sessionStorage.removeItem("userToken");
      state.userData = "";
      state.decodedToken = null;
    },
  },
});

export const { saveUserData, clearUserData } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
