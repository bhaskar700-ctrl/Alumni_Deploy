import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './api/routes/userRoutes.js';
import profileRoutes from './api/routes/profileRoutes.js';
import forumRoutes from './api/routes/forumRoutes.js';
import messageRoutes from './api/routes/messageRoutes.js';
import friendRequestRoutes from './api/routes/friendRequestRoutes.js';
import jobRoutes from './api/routes/jobRoutes.js';
import eventRoutes from './api/routes/eventRoutes.js';
import donationRoutes from './api/routes/donationRoutes.js'

import { PORT } from './config/index.js';

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies. This will allow you to access request body data.
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Alumni Information System Backend');
});

// Use userRoutes for handling endpoints under '/api/users'
app.use('/api/users', userRoutes);
app.use('/api/users', profileRoutes);
// app.post('/api/user/profile/test', (req, res) => {
//   res.send('Test route works');
// });
app.use('/api/friends', friendRequestRoutes);

// Message routes
app.use('/api/messages', messageRoutes);

// Forum routes
app.use('/api/forums', forumRoutes);

// Job routes
app.use('/api/jobs', jobRoutes); // Use job routes

app.use('/api/events', eventRoutes);

app.use('/api/donations', donationRoutes);



// Listen on the configured port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;