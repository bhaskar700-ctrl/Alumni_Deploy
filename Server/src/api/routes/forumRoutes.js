import express from 'express';
import ForumController from '../controllers/ForumController.js';
import authenticate from '../../middleware/authenticate.js'; // Ensure the path is correct

const router = express.Router();

// Apply the authenticate middleware to secure routes
router.post('/post', authenticate, ForumController.createPost);
router.post('/post/:postId/comment', authenticate, ForumController.commentOnPost);

// Assuming you want to keep these routes public, no authentication middleware is applied
router.get('/posts', ForumController.getAllPosts);
router.get('/post/:postId', ForumController.getPost);

export default router;
