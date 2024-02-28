import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/events';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth; // Retrieve the auth token from state
      const response = await axios.get(`${BASE_URL}/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${BASE_URL}/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
    'events/createEvent',
    async (eventData, { getState, rejectWithValue }) => {
      const { token, user } = getState().auth; // Assuming user details are stored in auth state
      if (!user || !user.id) {
        return rejectWithValue('No user ID found for organizer.');
      }
  
      // Include the organizer ID in the eventData
      const payloadWithOrganizer = { ...eventData, organizer: user.id };
  
      try {
        const response = await axios.post(`${BASE_URL}/create`, payloadWithOrganizer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Event creation error: ", error.response ? error.response.data : error);
        return rejectWithValue(error.response ? error.response.data : 'Unexpected error occurred');
      }
    }
  );
  

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.put(`${BASE_URL}/update/${eventId}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      await axios.delete(`${BASE_URL}/delete/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  events: [],
  event: null,
  status: 'idle',
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.event = action.payload;
      })
      // Handle other actions...
  },
});

export default eventSlice.reducer;
