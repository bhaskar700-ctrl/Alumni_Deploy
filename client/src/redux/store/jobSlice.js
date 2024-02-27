import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/jobs';

// Async thunks
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || 'Unexpected error occurred');
  }
});

export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (jobId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/${jobId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || 'Unexpected error occurred');
  }
});

export const createJob = createAsyncThunk('jobs/createJob', async (jobData, { getState, rejectWithValue }) => {
  const { token } = getState().auth;
  try {
    const response = await axios.post(`${BASE_URL}/create`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || 'Unexpected error occurred');
  }
});

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ jobId, jobData }, { getState, rejectWithValue }) => {
  const { token } = getState().auth;
  try {
    const response = await axios.put(`${BASE_URL}/update/${jobId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || 'Unexpected error occurred');
  }
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId, { getState, rejectWithValue }) => {
  const { token } = getState().auth;
  try {
    await axios.delete(`${BASE_URL}/delete/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return jobId;
  } catch (error) {
    return rejectWithValue(error?.response?.data || 'Unexpected error occurred');
  }
});

// Initial state
const initialState = {
  jobs: [],
  currentJob: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs.unshift(action.payload); // Add the new job at the beginning of the jobs array
      })
      .addCase(createJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload; // Update the job in the jobs array
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = state.jobs.filter(job => job._id !== action.payload); // Remove the deleted job from the jobs array
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
