import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Setup Axios Instance for forum-related API calls
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/forums', // Adjust to your API's base URL
});

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Async thunk for fetching forum posts
export const fetchPosts = createAsyncThunk(
  'forum/fetchPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { token } } = getState();
      setAuthToken(token);
      const response = await axiosInstance.get('/posts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not fetch posts');
    }
  }
);

// Async thunk for creating a forum post
export const createPost = createAsyncThunk(
  'forum/createPost',
  async (postData, { getState, rejectWithValue }) => {
    try {
      const { auth: { token } } = getState();
      setAuthToken(token);
      const response = await axiosInstance.post('/post', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not create post');
    }
  }
);

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    // Reducer to add a post to the state
    addPost(state, action) {
      state.posts = [action.payload, ...state.posts];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch posts';
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new post to the beginning of the posts array
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create post';
      });
  },
});

// Export the reducer and the addPost action
export const { addPost } = forumSlice.actions;
export default forumSlice.reducer;
