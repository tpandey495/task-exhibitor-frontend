// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAndProcesd } from "utils/apiAxios"; 

const Plans = "plan/fetchConsistency";

const initialState = {
  heatmapdata:[],
  data: null,
  error: null,
  loading: false,
};

export const fetchConsistency = createAsyncThunk(
    Plans,
  async (payload, { rejectWithValue }) => {
    try {
      const responseData = await fetchAndProcesd("/task/heatmap", "GET", null);
      return responseData;
    } catch (error) {
      throw rejectWithValue(error.message || "An error occurred while making the request.");
    }
  }
);


  //  to format date  like heatmap


const planSlice = createSlice({
  name: "consistency",
  initialState,
  reducers: {}, // Your other reducers if needed
  extraReducers: {
    [fetchConsistency.pending]: (state) => {
      state.loading = true;
    },
    [fetchConsistency.fulfilled]: (state, action) => {
    //   Changing format date 2023/2/1to 2023-02-01(compatiable to heatmap library)
      let dates = [],comp=action.payload.data;
      for (var i = 0; i < comp.length; i++) {
        comp[i]?.data?.forEach(element => {
          const datessplit = element?.date.split("/");
          const count = element?.cnt;
          const date = `${datessplit[2]}-${datessplit[1]}-${datessplit[0]}`;
          dates.push({date,count});
        });
      }
      state.loading = false;
      state.heatmapdata=dates;
    },
    [fetchConsistency.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { reducer } = planSlice;
export default reducer;
