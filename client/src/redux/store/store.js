import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import forumReducer from './forumSlice';
import jobReducer from './jobSlice'; // Import the job slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forum: forumReducer,
    jobs: jobReducer, // Add the job slice here
  },
});
