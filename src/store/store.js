import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import planReducer from './planSlice';
const store=configureStore({
    reducer:{
        auth:authReducer,
        plan:planReducer
    },
    devTools:true
});

export default store;