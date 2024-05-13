import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/analytics'; // Base URL for all analytics endpoints

// Fetching total donations by month
export const fetchTotalDonationsByMonth = createAsyncThunk(
  'analytics/fetchTotalDonationsByMonth',
  async () => {
    const response = await axios.get(`${BASE_URL}/total-donations-by-month`);
    return response.data;
  }
);

// Fetching total unique donors
export const fetchTotalUniqueDonors = createAsyncThunk(
  'analytics/fetchTotalUniqueDonors',
  async () => {
    const response = await axios.get(`${BASE_URL}/total-unique-donors`);
    return response.data;
  }
);

// Fetching total repeated donors
export const fetchTotalRepeatedDonors = createAsyncThunk(
  'analytics/fetchTotalRepeatedDonors',
  async () => {
    const response = await axios.get(`${BASE_URL}/total-repeated-donors`);
    return response.data;
  }
);

// Fetching top donors
export const fetchTopDonors = createAsyncThunk(
  'analytics/fetchTopDonors',
  async () => {
    const response = await axios.get(`${BASE_URL}/top-donors`);
    return response.data;
  }
);

// Fetching average donation amount
export const fetchAverageDonationAmount = createAsyncThunk(
  'analytics/fetchAverageDonationAmount',
  async () => {
    const response = await axios.get(`${BASE_URL}/average-donation-amount`);
    return response.data;
  }
);

// Fetching donation frequency
export const fetchDonationFrequency = createAsyncThunk(
  'analytics/fetchDonationFrequency',
  async () => {
    const response = await axios.get(`${BASE_URL}/donation-frequency`);
    return response.data;
  }
);

const donationAnalyticsSlice = createSlice({
  name: 'donationAnalytics',
  initialState: {
    data: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalDonationsByMonth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalDonationsByMonth.fulfilled, (state, action) => {
        state.data.totalDonationsByMonth = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTotalDonationsByMonth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          // This will handle all fulfilled actions if you want the same state updates
          const actionKey = action.type.split('/')[1].replace('fetch', '').replace(/([A-Z])/g, ' $1').trim().toLowerCase().replace(/\s/g, '');
          state.data[actionKey] = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          // Handle all rejections similarly if appropriate
          state.error = action.error ? action.error.message : 'Unknown error';
        }
      );
  }
});

export default donationAnalyticsSlice.reducer;
