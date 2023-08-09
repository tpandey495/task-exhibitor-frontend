import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginInfo, logout } from "../services/auth.service";
import { createSlice } from "@reduxjs/toolkit";
import decode from "jwt-decode";

// Define your 'user' variable before using it
const user = JSON.parse(localStorage.getItem("user"));

// Decoding 'user' outside the scope of 'if (user)'
let decoded = ""; // Default value in case there's no user in local storage
if (user) {
  decoded = decode(user); // Decoding the user token using jwt-decode
}

// 'initialState' should be an object, not an expression
const initialState = user
  ? { isLoggedIn: true, user: decoded }
  : { isLoggedIn: false, user: null };

export const logauth = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const data = await loginInfo(payload);
    return { user: data };
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [logauth.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [logauth.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { reducer } = authSlice;
export default reducer;
