import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import planReducer from './planSlice';
import progressReducer from './progressSlice';
import taskReducer from './taskSlice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        plan:planReducer,
        progress:progressReducer,
        task:taskReducer
    },
    devTools:true
});

export default store;