import express from 'express';
import MessageController from '../controllers/messageController.js';

const router = express.Router();

// Send a message
router.post('/send', MessageController.sendMessage);

// Get messages between two users
router.get('/conversation/:userId/:otherUserId', MessageController.getConversation);

export default router;
