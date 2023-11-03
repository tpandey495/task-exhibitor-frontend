// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAndProcesd } from "utils/apiAxios"; 

const Plans = "plan/fetchPlan";

const initialState = {
  plans:null,
  data: null,
  error: null,
  loading: false,
};

export const fetchPlan = createAsyncThunk(
    Plans,
  async (payload, { rejectWithValue }) => {
    try {
      const responseData = await fetchAndProcesd("/plan", "GET", null);
      return responseData;
    } catch (error) {
      throw rejectWithValue(error.message || "An error occurred while making the request.");
    }
  }
);

export const createPlan=createAsyncThunk(
   "plan/createPlan",
  async(payload,{rejectWithValue})=>{
    try{
    const responseData=await fetchAndProcesd("/plan","POST",payload);
    return responseData;
    }catch(error){
      throw rejectWithValue(error.message || "An error occurred while making the request.");
    }
  }
);

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {}, // Your other reducers if needed
  extraReducers: {
    [fetchPlan.pending]: (state) => {
      state.loading = true;
    },
    [fetchPlan.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.plans=action.payload
    },
    [fetchPlan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createPlan.pending]:(state)=>{
      state.loading=true;
    },
    [createPlan.fulfilled]:(state,action)=>{
       console.log(action.payload);
    },
    [createPlan.rejected]:(state,action)=>{
      state.error=action.payload.message;
    }
  },
});

export const { reducer } = planSlice;
export default reducer;
