// routes/forumRoutes.js
import express from 'express';
import ForumController from '../controllers/forumController.js';

const router = express.Router();

router.post('/post', ForumController.createPost);
router.post('/post/:postId/comment', ForumController.commentOnPost);
router.get('/posts', ForumController.getAllPosts);
router.get('/post/:postId', ForumController.getPost);

export default router;
