// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAndProcesd } from "utils/apiAxios";

// Define action types as constants for consistency
const task = "plan/task";

const initialState = {
    tasksfilter: {
        today: [],
        upcoming: [],
        daily: [],
    },
    tasks: [],
    data: null,
    error: null,
    loading: false,
};

export const getTaskByPlan = createAsyncThunk(
    task,
    async (payload, { rejectWithValue }) => {
        try {
            const responseData = await fetchAndProcesd("/task", "GET", payload);
            return responseData;
        } catch (error) {
            throw rejectWithValue(error.message || "An error occurred while making the request.");
        }
    }
);

export const gettaskbyfilter = createAsyncThunk(
    "filtertask", async (payload, { rejectWithValue }) => {
        try {
            const responseData = await fetchAndProcesd(`/task/${payload}`, "GET", null);
            return { payload, responseData };
        }
        catch (error) {
            throw rejectWithValue(error.message || "An error occurred while making request")
        } 
    }
);

export const createTask = createAsyncThunk(
    "createtask", async (payload, { rejectWithValue }) => {
        try {
            const responseData = await fetchAndProcesd(`/task`, "POST", payload);
            return responseData;
        }
        catch (error) {
            throw rejectWithValue(error.message || "An error occurred while making request")
        }
    }
);

export const updateTask = createAsyncThunk(
    "updatetask", async (updatedData, { rejectWithValue }) => {
        try {
            const responseData = await fetchAndProcesd(`/task`, "PUT", updatedData);
            return responseData;
        }
        catch (error) {
            throw rejectWithValue(error.message || "An error occurred while making request")
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearTask: (state) => {
            state.tasks=[];
            state.tasksfilter = {
                today: [],
                upcoming: [],
                daily: [],
            };
        },
    },
    extraReducers: {
        [getTaskByPlan.pending]: (state) => {
            state.loading = true;
        },
        [getTaskByPlan.fulfilled]: (state, action) => {
            state.loading = false;
            state.tasks = action.payload.data;
        },
        [getTaskByPlan.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [gettaskbyfilter.pending]: (state) => {
            state.loading = true;
        },
        [gettaskbyfilter.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action.payload)
            state.tasksfilter[action.payload.payload] = action.payload.responseData?.data;
        },
        [gettaskbyfilter.rejected]: (state, action) => {  state.loading = false;
            state.error = action.payload.message;
            state.error = action.payload.message;
        },
        [updateTask.pending]: (state) => {
            state.loading = true;
        },
        [updateTask.fulfilled]: (state, action) => {
            state.loading = false;
            //console.log(action);
        },
        [updateTask.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { reducer,clearTask} = taskSlice.actions;
export default taskSlice.reducer;
