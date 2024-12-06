import { configureStore } from "@reduxjs/toolkit";
import autheReducer from "../redux/slice/AuthSlice"

const store = configureStore({
    reducer:{
        auth:autheReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;