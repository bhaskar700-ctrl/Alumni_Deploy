import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Assuming the token is stored in the auth slice of the Redux store
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/messages'
});

// Thunk for fetching the list of users
export const fetchUsers = createAsyncThunk(
  'chatting/fetchUsers',
  async (_, { getState }) => {
    const { auth: { token } } = getState();
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await axiosInstance.get('/users');
    return response.data;
  }
);

// Thunk for fetching conversations with a specific user
export const fetchConversations = createAsyncThunk(
  'chatting/fetchConversations',
  async (otherUserId, { getState }) => {
    const { auth: { token } } = getState();
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    console.log(`Fetching conversations for user ID: ${otherUserId}`);


    const response = await axiosInstance.get(`/conversation/${otherUserId}`);
    return response.data;
  }
);

// Thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chatting/sendMessage',
  async ({ receiverId, content }, { getState }) => {
    const { auth: { token } } = getState();
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await axiosInstance.post('/send', { receiverId, content });
    return response.data;
  }
);

export const fetchConversationsList = createAsyncThunk(
  'chatting/fetchConversationsList',
  async (_, { getState }) => {
      const { auth: { token } } = getState();
      // Set the Authorization header for this request without affecting global axios defaults
      const config = token ? {
        headers: { 'Authorization': `Bearer ${token}` }
      } : {};

      try {
        const response = await axiosInstance.get('/list', config);
        console.log('Conversations List:', response.data);
        return response.data;
      } catch (error) {
        // Handle error appropriately
        console.error('Error fetching conversations list:', error);
        return [];  // Return an empty array or appropriate error handling
      }
  }
);


const initialState = {
  users: [],
  conversations: [],
  activeChat: null,
  showUsersList: false,
  status: 'idle',
  error: null,
};

const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  reducers: {
    toggleUsersList(state) {
      state.showUsersList = !state.showUsersList;
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // Here you might want to update the conversation with the new message
        state.conversations.push(action.payload);
      });
    // You can handle more cases like pending, rejected for each async thunk if needed
  }
});

export const { toggleUsersList, setActiveChat } = chattingSlice.actions;

export default chattingSlice.reducer;
