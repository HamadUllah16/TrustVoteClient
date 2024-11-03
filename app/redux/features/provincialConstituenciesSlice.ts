import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initalValues = {
    provincialConstituencies: {
        province: '',
        constituencies: [],
    },

    loading: false,
    message: '',
    error: ''
}

export const kpkProvincialConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'provincialConstituency/kpkProvincialConstituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/provincial-constituencies/kpk');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const sindhProvincialConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'provincialConstituency/sindhProvincialConstituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/provincial-constituencies/sindh');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const punjabProvincialConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'provincialConstituency/punjabProvincialConstituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/provincial-constituencies/punjab');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const balochistanProvincialConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'provincialConstituency/balochistanProvincialConstituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/provincial-constituencies/balochistan');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)





const provincialConstituencySlice = createSlice({
    name: 'provincialConstituency',
    initialState: initalValues,
    reducers: {

    },
    extraReducers(builder) {
        // kpk builder
        builder.addCase(kpkProvincialConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(kpkProvincialConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.provincialConstituencies = action.payload?.constituencies;
            state.message = action.payload?.message;
        })
        builder.addCase(kpkProvincialConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not fetch KPK Provincial Constituencies'
        })

        // sindh builder
        builder.addCase(sindhProvincialConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(sindhProvincialConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.provincialConstituencies = action.payload?.constituencies;
            state.message = action.payload?.message;
        })
        builder.addCase(sindhProvincialConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not fetch Sindh Provincial Constituencies'
        })

        // punjab builder
        builder.addCase(punjabProvincialConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(punjabProvincialConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.provincialConstituencies = action.payload?.constituencies;
            state.message = action.payload?.message;
        })
        builder.addCase(punjabProvincialConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not fetch Punjab Provincial Constituencies'
        })

        // balochistan builder
        builder.addCase(balochistanProvincialConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(balochistanProvincialConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.provincialConstituencies = action.payload?.constituencies;
            state.message = action.payload?.message;
        })
        builder.addCase(balochistanProvincialConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not fetch Balochistan Provincial Constituencies'
        })
    },
}
)

export default provincialConstituencySlice.reducer;