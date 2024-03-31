import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import MessageController from '../controllers/MessageController.js';

function messageRoutes(io) {
    const router = express.Router();
    const messageController = new MessageController(io);

    router.post('/send', authenticate, (req, res) => messageController.sendMessage(req, res));
    // router.get('/conversation/:userId/:otherUserId', authenticate, (req, res) => messageController.getConversation(req, res));
    router.get('/conversation/:otherUserId', authenticate, (req, res) => messageController.getConversation(req, res));

    router.get('/search', authenticate, (req, res) => messageController.searchMessages(req, res));
    router.post('/messages/:messageId/read', authenticate, (req, res) => messageController.markMessageAsRead(req, res));
    router.put('/messages/:messageId', authenticate, (req, res) => messageController.editMessage(req, res));
    router.delete('/:messageId', authenticate, (req, res) => messageController.deleteMessage(req, res));
    router.get('/list', authenticate, (req, res) => messageController.listConversations(req, res));

    // Route to start a new conversation
    router.post('/start', authenticate, (req, res) => messageController.startConversation(req, res));

    router.get('/users', authenticate, (req, res) => messageController.getAllUsers(req, res));


    // Add other routes as needed

    return router;
}

<<<<<<< HEAD
export default messageRoutes;
=======
export default messageRoutes;
>>>>>>> c0121ef8c58a6127a4dac48f7faa8276d93921f6
