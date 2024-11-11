import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
interface constituencyState {
    province: string,
    constituencies: { area: string, constituency: string }[]
}

const initalValues = {
    provincialConstituencies: {
        province: '',
        constituencies: [],
    },
    all: <constituencyState[]>[],
    pk: <constituencyState>{},
    ps: <constituencyState>{},
    pb: <constituencyState>{},
    pp: <constituencyState>{},

    loading: false,
    message: '',
    error: ''
}

export const addProvincialConstituency = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'provincialConstituency/addProvincialConstituency',
    async (data: { constituencyName: string, area: string, province: string }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.post('/provincial-constituencies/add-provincial-constituency', data);
            dispatch(allProvincialConstituencies());
            return response;
        } catch (error: any) {
            console.log(error)
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const allProvincialConstituencies = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'provincialConstituency/allProvincialConstituencies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/provincial-constituencies/all');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error?.message })
        }
    }
)

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
            state.pk = action.payload?.constituencies;
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
            state.ps = action.payload?.constituencies;
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
            state.pp = action.payload?.constituencies;
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
            state.pb = action.payload?.constituencies;
            state.message = action.payload?.message;
        })
        builder.addCase(balochistanProvincialConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not fetch Balochistan Provincial Constituencies'
        })

        // all provincial constituencies builder
        builder.addCase(allProvincialConstituencies.pending, state => {
            state.loading = true
        })
        builder.addCase(allProvincialConstituencies.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.all = action.payload?.allConstituencies;
        })
        builder.addCase(allProvincialConstituencies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Could not fetch all provincial constituencies.'
        })

        // add provincial constituency builder
        builder.addCase(addProvincialConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(addProvincialConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
            toast.success(state.message);
        })
        builder.addCase(addProvincialConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message!;
            toast.error(state.error);
        })
    },
}
)

export default provincialConstituencySlice.reducer;