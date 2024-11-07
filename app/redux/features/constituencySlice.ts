import axiosInstance from "@/app/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface constituencyState {
    province: string,
    constituencies: { area: string, constituency: string }[]
}

const initialState = {

    kpk: <constituencyState>{},
    punjab: <constituencyState>{},
    sindh: <constituencyState>{},
    balochistan: <constituencyState>{},
    capital: <constituencyState>{},

    allConstituencies: [],
    loading: false,
    message: '',
    error: ''
}

export const addConstituency = createAsyncThunk<any, any, { rejectValue: { message: string } }>(
    'constituency/addConstituency',
    async (data: { constituencyName: string, area: string, province: string }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.post('/constituency/add-constituency', data)
            dispatch(getAllConstituency())
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'Error adding constituency' })
        }
    }
)

export const punjabConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'constituency/punjab-constituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/constituency/punjab-constituencies')
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'Error fetching punjab constituencies' })
        }
    }
)

export const sindhConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'constituency/sindh-constituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance('/constituency/sindh-constituencies');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const kpkConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'constituency/kpk-constituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance('/constituency/kpk-constituencies');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const capitalConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'constituency/capital-constituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance('/constituency/capital-constituencies');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const balochistanConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'constituency/balochistan-constituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance('/constituency/balochistan-constituencies');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)

export const getAllConstituency = createAsyncThunk<any, void, { rejectValue: { message: string } }>(
    'constituency/all-constituency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance('/constituency/all-constituencies');
            return response;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message })
        }
    }
)




const constituencySlice = createSlice({
    name: 'constituency',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        // add constituency
        builder.addCase(addConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(addConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.message;
        })
        builder.addCase(addConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching data';
        })

        // punjab constituencies
        builder.addCase(punjabConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(punjabConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.punjab = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(punjabConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching punjab constituencies'
        })

        // sindh constituencies
        builder.addCase(sindhConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(sindhConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.punjab = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(sindhConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching sindh constituencies'
        })

        // balochistan constituencies
        builder.addCase(balochistanConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(balochistanConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.balochistan = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(balochistanConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching balochistan constituencies'
        })

        // kpk constituencies
        builder.addCase(kpkConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(kpkConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.kpk = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(kpkConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching kpk constituencies'
        })

        // capital constituencies
        builder.addCase(capitalConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(capitalConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.capital = action.payload.data;
            state.message = action.payload.message;
        })
        builder.addCase(capitalConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error fetching capital constituencies'
        })

        // all constituencies builder
        builder.addCase(getAllConstituency.pending, state => {
            state.loading = true;
        })
        builder.addCase(getAllConstituency.fulfilled, (state, action) => {
            state.loading = false;
            state.allConstituencies = action.payload?.data;
            state.message = action.payload?.message;
        })
        builder.addCase(getAllConstituency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Could not fetch all constituencies.'
        })
    },
})


export default constituencySlice.reducer;
