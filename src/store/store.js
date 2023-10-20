import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import planReducer from './planSlice';
import progressReducer from './progressSlice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        plan:planReducer,
        progress:progressReducer
    },
    devTools:true
});

export default store;