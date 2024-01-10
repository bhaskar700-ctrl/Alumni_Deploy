// routes/messageRoutes.js
import express from 'express';
import MessageController from '../controllers/MessageController.js';
import authenticate from '../../middleware/authenticate.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/send', authenticate, MessageController.sendMessage);
router.get('/conversation/:userId/:otherUserId', authenticate, MessageController.getConversation);
router.delete('/:messageId', authenticate, MessageController.deleteMessage);

export default router;
