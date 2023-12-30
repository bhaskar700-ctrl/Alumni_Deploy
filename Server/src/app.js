import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './api/routes/userRoutes.js';
import profileRoutes from './api/routes/profileRoutes.js';
import forumRoutes from './api/routes/forumRoutes.js';
import messageRoutes from './api/routes/messageRoutes.js';
import friendRequestRoutes from './api/routes/friendRequestRoutes.js';
import { PORT } from './config/index.js';

const app = express();

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
app.use('/api/messages', messageRoutes);
app.use('/api/forums', forumRoutes);

// Listen on the configured port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;