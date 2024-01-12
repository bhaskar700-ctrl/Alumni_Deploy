import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import userRoutes from './api/routes/userRoutes.js';
import profileRoutes from './api/routes/profileRoutes.js';
import forumRoutes from './api/routes/forumRoutes.js';
import messageRoutes from './api/routes/messageRoutes.js';
import friendRequestRoutes from './api/routes/friendRequestRoutes.js';
import jobRoutes from './api/routes/jobRoutes.js';
import eventRoutes from './api/routes/eventRoutes.js';
import donationRoutes from './api/routes/donationRoutes.js';
import notificationRoutes from './api/routes/NotificationRoutes.js';

import { PORT } from './config/index.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',  // Be cautious with this in production
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Alumni Information System Backend');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/friends', friendRequestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.IO Real-time Connections
io.on('connection', (socket) => {
    console.log('A user connected with id:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    // Handle other real-time events here
});

// Change app.listen to server.listen to include Socket.IO
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
