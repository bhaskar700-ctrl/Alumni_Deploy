import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Setting base URL for API requests
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/donations';

const initialState = {
  donations: [],
  history: [],
  status: 'idle',
  refundStatus: 'idle',
  error: null,
};

// Async thunk for making a donation
export const makeDonation = createAsyncThunk(
  'donations/makeDonation',
  async (donationData, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Ensure this is the correct path to retrieve the token
    try {
      const response = await axios.post(`${BASE_URL}/make`, donationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching donation history
export const fetchDonationHistory = createAsyncThunk(
  'donations/fetchHistory',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Adding token for history as well
    try {
      const response = await axios.get(`${BASE_URL}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for refunding a donation
export const refundDonation = createAsyncThunk(
  'donations/refundDonation',
  async (donationId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(`${BASE_URL}/refund/${donationId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    resetDonationState: (state) => {
      state.status = 'idle';
      state.refundStatus = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeDonation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(makeDonation.fulfilled, (state, action) => {
        state.donations.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(makeDonation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Could not process donation';
      })
      .addCase(fetchDonationHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDonationHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchDonationHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Could not fetch history';
      })
      .addCase(refundDonation.pending, (state) => {
        state.refundStatus = 'loading';
      })
      .addCase(refundDonation.fulfilled, (state, action) => {
        state.refundStatus = 'succeeded';
      })
      .addCase(refundDonation.rejected, (state, action) => {
        state.refundStatus = 'failed';
        state.error = action.payload.message || 'Refund failed';
      });
  }
});

export const { resetDonationState } = donationSlice.actions;
export default donationSlice.reducer;
