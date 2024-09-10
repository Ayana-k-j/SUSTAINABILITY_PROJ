import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPresurveyDetails } from '../../services/apiService';

// Define initial state
const initialState = {
  data: {},
  status: 'idle',
  error: null
};

// Async thunk to fetch users
export const getPresurveysBySupplierId = createAsyncThunk('supplier/supplierId', async (supplierId, thunkAPI) => {
  try{
    const response = await fetchPresurveyDetails(supplierId);
    return response.data;
  }catch(error){
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Create a slice
const presurveysSlice = createSlice({
  name: 'presurveys',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPresurveysBySupplierId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPresurveysBySupplierId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getPresurveysBySupplierId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default presurveysSlice.reducer;