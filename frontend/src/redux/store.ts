import { configureStore } from "@reduxjs/toolkit";
import autheReducer from "../redux/slice/AuthSlice"
import bookReducer from '../redux/slice/bookSlice'

const store = configureStore({
    reducer:{
        auth:autheReducer,
        books:bookReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;