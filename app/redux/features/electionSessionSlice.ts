import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { string } from "yup";


type ElectionSession = {
    _id: string;
    name: string;
    electionSessionPublicKey: string;
    status: string;
    scheduledTime: Date | null;
};


interface ElectionState {
    electionSession: ElectionSession;
    allElectionSessions: ElectionSession[];
    message: string;
    error: string;
    loading: boolean;
}

const initialState: ElectionState = {
    electionSession: {
        _id: '',
        name: '',
        electionSessionPublicKey: '',
        status: '',
        scheduledTime: null,
    },
    allElectionSessions: [],
    message: '',
    error: '',
    loading: false
};

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

export const tryElectionSessionTransaction = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'electionSession/tryElectionSessionTransaction',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/election-session/try-election-session-transaction', data);

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
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/election-session/recent-election-session`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message });
        }
    }
)

export const getAllElectionSessions = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'electionSession/getAllElectionSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/election-session/all');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error?.message })
        }
    }
)

export const modifyElectionSession = createAsyncThunk<any, { status: string, electionSessionPublicKey: string }, { rejectValue: { message: string } }>(
    'admin/modifyElectionSession',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/election-session/configure-election-session', data);
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
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

        // modify election session
        builder.addCase(modifyElectionSession.pending, state => {
            state.loading = true;
        })
        builder.addCase(modifyElectionSession.fulfilled, (state, action) => {
            state.loading = false;
            state.electionSession.status = action.payload?.status;
            state.message = action.payload?.message;
        })
        builder.addCase(modifyElectionSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to modify the election session.'
        })

        // all election sessions builder
        builder.addCase(getAllElectionSessions.pending, state => {
            state.loading = true;
        })
        builder.addCase(getAllElectionSessions.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.allElectionSessions = action.payload?.allElectionSessions;
        })
        builder.addCase(getAllElectionSessions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message!;
        })
    },
})

export default electionSessionSlice.reducer;