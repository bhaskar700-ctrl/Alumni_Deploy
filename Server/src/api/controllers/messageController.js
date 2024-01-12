// controllers/messageController.js
import Message from '../models/Message.js';
import User from '../models/User.js';
import NotificationController from './NotificationController.js'; // Import User model for validation

const MessageController = {
    async sendMessage(req, res) {
        try {
            const senderId = req.user._id;  // Assuming the user ID is stored in req.user after authentication
            const { receiverId, content } = req.body;

            // Validate receiver existence
            const receiver = await User.findById(receiverId);
            if (!receiver) {
                return res.status(404).json({ message: 'Receiver not found' });
            }

            const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
            await newMessage.save();

            // Send a notification to the receiver
            NotificationController.createNotification(
                receiverId,
                'New Message',
                `You have a new message from ${req.user.name}`, // Assuming req.user.name has the sender's name
                `/messages/${newMessage._id}` // Adjust URL as per your routing logic
            );

            res.status(201).json({ message: 'Message sent', data: newMessage });
        } catch (error) {
            res.status(500).json({ message: 'Error sending message: ' + error.message });
        }
    },

    async getConversation(req, res) {
        try {
            const { userId, otherUserId } = req.params;

            // Validate both user IDs
            const usersExist = await User.countDocuments({
                '_id': { $in: [userId, otherUserId] }
            }) === 2;

            if (!usersExist) {
                return res.status(404).json({ message: 'One or both users not found' });
            }

            const messages = await Message.find({
                $or: [
                    { sender: userId, receiver: otherUserId },
                    { sender: otherUserId, receiver: userId }
                ]
            }).sort({ createdAt: 1 }).populate('sender receiver', 'name'); // Adjust the populated fields as needed

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving conversation: ' + error.message });
        }
    },

    async deleteMessage(req, res) {
        try {
            const { messageId } = req.params;

            // Optional: Check if the message exists before attempting to delete
            const message = await Message.findById(messageId);
            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }

            // Optional: Check if the requester is the sender of the message
            // Assuming you have the authenticated user's ID in req.user._id
            if (message.sender.toString() !== req.user._id) {
                return res.status(403).json({ message: 'Unauthorized to delete this message' });
            }

            await Message.findByIdAndDelete(messageId);
            res.status(200).json({ message: 'Message successfully deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting message: ' + error.message });
        }
    }
};

export default MessageController;
