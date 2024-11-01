import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    electionSession: {
        _id: '',
        name: '',
        publicKey: '',
        status: '',
        scheduledTime: null,

    },

    message: '',
    error: '',
    loading: false
}

export const scheduleElectionSession = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'electionSession/scheduleElectionSession',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/election-session/schedule-election-session', data);
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message });
        }
    }
)

export const getElectionSession = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'electionSession/getElectionSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/election-session/recent-election-session');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message });
        }
    }
)

const electionSessionSlice = createSlice({
    name: 'electionSession',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // schedule election session builder
        builder.addCase(scheduleElectionSession.pending, state => {
            state.loading = true;
        })
        builder.addCase(scheduleElectionSession.fulfilled, (state, action) => {
            state.loading = false;
            state.electionSession = action.payload?.electionSession;
            state.message = action.payload?.message;
        })
        builder.addCase(scheduleElectionSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error occurred while scheduling election session';
        })

        // get election session builder
        builder.addCase(getElectionSession.pending, state => {
            state.loading = true;
        })
        builder.addCase(getElectionSession.fulfilled, (state, action) => {
            state.loading = false;
            state.electionSession = action.payload?.electionSession;
            state.message = action.payload?.message;
        })
        builder.addCase(getElectionSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Error occurred while fetching election sessions.';
        })
    },
})

export default electionSessionSlice.reducer;