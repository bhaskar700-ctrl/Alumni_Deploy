import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Assuming your backend API base URL
const BASE_URL = 'http://localhost:3000/api/forums';

// Fetch posts async thunk
export const fetchPosts = createAsyncThunk('forum/fetchPosts', async (_, { getState, rejectWithValue }) => {
    try {
        const { auth: { token } } = getState();
        const response = await axios.get(`${BASE_URL}/posts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create post async thunk
export const createPost = createAsyncThunk('forum/createPost', async (postContent, { getState, rejectWithValue }) => {
    try {
        const { auth: { token } } = getState();
        const response = await axios.post(`${BASE_URL}/post`, { content: postContent }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create comment async thunk
export const createComment = createAsyncThunk('forum/createComment', async ({ postId, commentContent }, { getState, rejectWithValue }) => {
    try {
        const { auth: { token } } = getState();
        const response = await axios.post(`${BASE_URL}/posts/${postId}/comments`, { content: commentContent }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Assuming this returns the updated post
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    createStatus: 'idle', // Separate status for post creation to manage UI states accordingly
    createError: null,
};

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {},
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
                state.error = action.payload.error;
            })
            .addCase(createPost.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload.error;
            })
            .addCase(createComment.pending, (state) => {
                // Optionally handle comment creation pending state
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const updatedPostIndex = state.posts.findIndex(post => post._id === action.payload._id);
                if (updatedPostIndex !== -1) {
                    state.posts[updatedPostIndex] = action.payload; // Replace the post with the updated one
                }
            })
            .addCase(createComment.rejected, (state, action) => {
                // Optionally handle comment creation rejection
            });
    },
});

export default forumSlice.reducer;
