// controllers/messageController.js
import Message from '../models/Message.js';

const MessageController = {
    async sendMessage(req, res) {
        try {
            const { senderId, receiverId, content } = req.body;
            const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
            await newMessage.save();

            res.status(201).json({ message: 'Message sent', data: newMessage });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getConversation(req, res) {
        try {
            const { userId, otherUserId } = req.params;
            const messages = await Message.find({
                $or: [
                    { sender: userId, receiver: otherUserId },
                    { sender: otherUserId, receiver: userId }
                ]
            }).sort({ createdAt: 1 }); // Sort by creation time

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default MessageController;
