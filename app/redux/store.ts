import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/authSlice'
import userSlice from "./features/userSlice";
import profileCompletionSlice from "./features/profileCompletionSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profileCompletion: profileCompletionSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;