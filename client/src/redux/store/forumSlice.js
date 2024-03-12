import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/forums',
});

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

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

export const createPost = createAsyncThunk(
  'forum/createPost',
  async (postData, { getState, rejectWithValue }) => {
    try {
      const { auth: { token } } = getState();
      setAuthToken(token);
      const response = await axiosInstance.post('/posts', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not create post');
    }
  }
);

// Async thunk for creating a comment
export const createComment = createAsyncThunk(
  'forum/createComment',
  async ({ postId, content }, { getState, rejectWithValue }) => {
    try {
      const { auth: { token } } = getState();
      setAuthToken(token);
      const response = await axiosInstance.post(`/post/${postId}/comment`, { content });
      return { postId, comment: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Could not add comment');
    }
  }
);

const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts = [action.payload, ...state.posts];
    },
    // Reducer to add a comment to a specific post
    addCommentToPost(state, action) {
      const { postId, comment } = action.payload;
      const postIndex = state.posts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments.push(comment);
      }
    },
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
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create post';
      })
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { postId, comment } = action.payload;
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments.push(comment);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Could not add comment';
      });
  },
});

export const { addPost, addCommentToPost } = forumSlice.actions;
export default forumSlice.reducer;
