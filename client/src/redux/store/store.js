import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import forumReducer from './forumSlice';
import jobReducer from './jobSlice'; // Import the job slice
import eventReducer from './eventSlice'; // Import the event slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forum: forumReducer,
    jobs: jobReducer, // Ensure the job slice is added here
    events: eventReducer, // Add the event slice here
  },
});
