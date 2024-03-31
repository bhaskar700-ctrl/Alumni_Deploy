import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import forumReducer from './forumSlice';
import jobReducer from './jobSlice'; // Import the job slice
import eventReducer from './eventSlice'; // Import the event slice
import userReducer from './userSlice'; // Import the user slice
import chattingReducer from './chattingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forum: forumReducer,
    jobs: jobReducer, // Ensure the job slice is added here
    events: eventReducer, // Add the event slice here
    user: userReducer, // Add the user slice here
    chatting: chattingReducer,
  },
});
