import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/authSlice'
import userSlice from "./features/userSlice";
import profileCompletionSlice from "./features/profileCompletionSlice";
import adminSlice from "./features/adminSlice";
import candidateSlice from "./features/candidateSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profileCompletion: profileCompletionSlice,
        user: userSlice,
        admin: adminSlice,
        candidate: candidateSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;