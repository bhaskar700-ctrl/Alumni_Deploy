import express from 'express';
import ForumControllerInit from '../controllers/forumController.js';
import authenticate from '../../middleware/authenticate.js'; // Ensure the path is correct

// This function will initialize the ForumController with the Socket.IO instance
// Assuming `io` is imported or passed to this module
export default function forumRoutes(io) {
    const ForumController = ForumControllerInit(io);

    const router = express.Router();

    // Apply the authenticate middleware to secure routes
    router.post('/post', authenticate, ForumController.createPost);
    router.post('/post/:postId/comment', authenticate, ForumController.commentOnPost);

    // Public routes
    router.get('/posts', ForumController.getAllPosts);
    router.get('/post/:postId', ForumController.getPost);

    return router;
}
