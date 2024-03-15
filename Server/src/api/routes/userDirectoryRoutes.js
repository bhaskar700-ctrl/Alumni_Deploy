// Import express
import express from 'express';

// Import the user controller
import { filterUsers, getUserById } from '../controllers/userDirectoryController.js';

// Create a new router instance
const router = express.Router();

// Define routes
router.get('/users', filterUsers);
router.get('/users/:userId', getUserById); // Add route for fetching user by ID

// Export the router
export default router;
