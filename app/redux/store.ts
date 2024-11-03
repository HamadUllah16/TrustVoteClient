import { configureStore } from "@reduxjs/toolkit";
import authSlice from './features/authSlice'
import userSlice from "./features/userSlice";
import profileCompletionSlice from "./features/profileCompletionSlice";
import adminSlice from "./features/adminSlice";
import candidateSlice from "./features/candidateSlice";
import constituencySlice from './features/constituencySlice';
import provincialConstituencySlice from './features/provincialConstituenciesSlice'
import electionSessionSlice from './features/electionSessionSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profileCompletion: profileCompletionSlice,
        user: userSlice,
        admin: adminSlice,
        candidate: candidateSlice,
        constituency: constituencySlice,
        provincialConstituency: provincialConstituencySlice,
        electionSession: electionSessionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;