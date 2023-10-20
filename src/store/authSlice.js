// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAndProcesd } from "utils/apiAxios"; // Import your global API function
import jwtDecode from "jwt-decode";

// Define action types as constants for consistency
const USER_LOGIN = "user/login";
const USER_INFO = "user/fetchInfo";

// Initialize the user based on localStorage
let user = JSON.parse(localStorage.getItem("user"));
if (user) {
  user = jwtDecode(user);
}

const initialState = {
  users: [],
  user: user,
  isLoggedin: user ? true : false,
  data: null,
  error: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  USER_LOGIN,
  async (payload, { rejectWithValue }) => {
    try {
      const responseData = await fetchAndProcesd("/users/login", "POST", payload);
      return responseData;
    } catch (error) {
      throw rejectWithValue(error.message || "An error occurred while making the request.");
    }
  }
);

export const UserInfo = createAsyncThunk(
  USER_INFO,
  async (payload, { rejectWithValue }) => {
    try {
      const responseData = await fetchAndProcesd("/users/user", "GET");
      return responseData;
    } catch (error) {
      throw rejectWithValue(error.message || "An error occurred while making the request.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // Your other reducers if needed
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload?.authToken));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [UserInfo.pending]: (state) => {
      state.loading = true;
    },
    [UserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [UserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { reducer } = userSlice;
export default reducer;
