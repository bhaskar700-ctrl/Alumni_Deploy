// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null, // This will store detailed user information
  },
  reducers: {
    // Handles successful login, updating state with user details and token
    loginSuccess: (state, action) => {
      const { token, userType, personalDetails, contactInfo, _id } = action.payload;
      console.log('Login success:', action.payload); // Log the entire payload
      state.isAuthenticated = true;
      state.token = token;
      state.user = {
        id: _id, // Storing the user ID here
        userType,
        personalDetails,
        contactInfo,
      };
      console.log('User ID on login:', _id); // Specifically log the user ID
    },
    // Handles user logout, resetting the auth state
    logout: (state) => {
      console.log('User logged out. Previous state:', state);
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    // Handles login failure, updating state accordingly
    loginFailure: (state, action) => {
      console.log('Login failure:', action.payload); // Log the failure reason
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout, loginFailure } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth.isAuthenticated;
export const selectUserDetails = (state) => state.auth.user;
export const selectUserToken = (state) => state.auth.token;

export default authSlice.reducer;
