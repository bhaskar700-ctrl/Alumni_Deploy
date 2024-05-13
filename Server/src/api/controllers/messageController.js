// controllers/messageController.js
import Message from '../models/Message.js';
import User from '../models/User.js';
import NotificationController from './notificationController.js';

class MessageController {
    constructor(io) {
        this.io = io;
    }

    async sendMessage(req, res) {
        try {
            const senderId = req.user._id;
            const { receiverId, content } = req.body;

            const receiver = await User.findById(receiverId);
            if (!receiver) {
                return res.status(404).json({ message: 'Receiver not found' });
            }

            const newMessage = new Message({ sender: senderId, receiver: receiverId, content });
            await newMessage.save();

            // Emit the message to both the sender and receiver using their user IDs as room names
            this.io.to(senderId.toString()).emit('newMessage', newMessage);
            this.io.to(receiverId.toString()).emit('newMessage', newMessage);

            NotificationController.createNotification(
                receiverId,
                'New Message',
                `You have a new message from ${req.user.name}`,
                `/messages/${newMessage._id}`
            );

            res.status(201).json({ message: 'Message sent', data: newMessage });
        } catch (error) {
            res.status(500).json({ message: 'Error sending message: ' + error.message });
        }
    }

    async getAllUsers(req, res) {
        const userId = req.user._id; // Assuming you have user information in the request, typically from a middleware
    
        try {
            const users = await User.find({ _id: { $ne: userId } })
                                     .select("personalDetails.firstName personalDetails.lastName personalDetails.profilePicture");
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users: ' + error.message });
        }
    }

    async searchUsers(req, res) {
        const { query } = req.query;
        const userId = req.user._id; // Extract the user ID from the authenticated user's request
    
        const users = await User.find({
            $text: { $search: query },
            _id: { $ne: userId } // Exclude the current user from the results
        })
        .select("personalDetails.firstName personalDetails.lastName personalDetails.profilePicture");
    
        res.status(200).json(users);
    }


    async getConversation(req, res) {
        const userId = req.user._id;  // Get the authenticated user's ID from the request object
        const { otherUserId } = req.params;  // Get the other user's ID from the request parameters
    
        try {
            // Check if both users exist in the database
            const userExistenceCount = await User.countDocuments({
                '_id': { $in: [userId, otherUserId] }
            });
            
            if (userExistenceCount !== 2) {
                return res.status(404).json({ message: 'One or both users not found' });
            }
    
            // Fetch the conversation messages between the two users
            const messages = await Message.find({
                $or: [
                    { sender: userId, receiver: otherUserId },
                    { sender: otherUserId, receiver: userId }
                ]
            })
            .sort({ createdAt: 1 })  // Sort by creation time to get the messages in order
            .populate('sender receiver', 'personalDetails.firstName personalDetails.lastName personalDetails.profilePicture');
    
            // Send the fetched messages as a response
            res.status(200).json(messages);
        } catch (error) {
            // If an error occurs, send a 500 Internal Server Error status and the error message
            res.status(500).json({ message: 'Error retrieving conversation: ' + error.message });
        }
    }
    
    async listConversations(req, res) {
        try {
            const userId = req.user._id;
            const searchQuery = req.query.search; // Get the search query from the request's query string
    
            let matchStage = {
                $match: {
                    $or: [{ sender: userId }, { receiver: userId }]
                }
            };
    
            if (searchQuery) {
                matchStage = {
                    $match: {
                        $or: [{ sender: userId }, { receiver: userId }],
                        $text: { $search: searchQuery } // Use text search on user collection
                    }
                };
            }
    
            const conversations = await Message.aggregate([
                matchStage,
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $group: {
                        _id: {
                            $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"]
                        },
                        lastMessage: { $first: "$$ROOT" }
                    }
                },
                {
                    $sort: { "lastMessage.createdAt": -1 }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: "$userDetails"
                },
                {
                    $project: {
                        _id: 1,
                        lastMessage: 1,
                        "userDetails.personalDetails": 1
                    }
                }
            ]);
    
            res.status(200).json(conversations);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving conversations: ' + error.message });
        }
    }

    async startConversation(req, res) {
        const { userId } = req.user._id; // ID of the current user
        const { receiverId } = req.body; // ID of the user to start a conversation with

        try {
            // Check if the receiver exists
            const receiver = await User.findById(receiverId);
            if (!receiver) {
                return res.status(404).json({ message: 'Receiver not found' });
            }

            // Check if there's already an existing conversation between the two users
            const existingConversation = await Message.findOne({
                $or: [
                    { sender: userId, receiver: receiverId },
                    { sender: receiverId, receiver: userId }
                ]
            });

            if (existingConversation) {
                return res.status(400).json({ message: 'Conversation already exists' });
            }

            // You can create a new conversation in the database if your schema requires it
            // For now, we just return a success response as the conversation will be created
            // when the first message is sent

            res.status(200).json({ message: 'Conversation started', data: { receiverId: receiver._id } });
        } catch (error) {
            res.status(500).json({ message: 'Error starting conversation: ' + error.message });
        }
    }
    
    async searchMessages(req, res) {
        try {
            const userId = req.user._id;
            const { query } = req.query;  // Get the search query from the request's query string

            // Perform a text search on the content field of the messages
            const messages = await Message.find({
                $text: { $search: query },
                $or: [{ sender: userId }, { receiver: userId }]  // Optional: limit search to user's messages
            })
            .populate('sender receiver', 'personalDetails.firstName personalDetails.lastName personalDetails.profilePicture');

            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Error searching messages: ' + error.message });
        }
    }

    async markAsRead(req, res) {
        const { messageId } = req.params;
        const userId = req.user._id;
    
        try {
            const message = await Message.findById(messageId);
            if (!message.readBy.includes(userId)) {
                message.readBy.push(userId);
                await message.save();
                this.io.to(message.sender.toString()).emit('messageRead', { messageId, userId });
            }
            res.status(200).json({ message: 'Message marked as read' });
        } catch (error) {
            res.status(500).json({ message: 'Error marking message as read: ' + error.message });
        }
    }

    async editMessage(req, res) {
        const { messageId } = req.params;
        const { content } = req.body;
    
        try {
            const updatedMessage = await Message.findByIdAndUpdate(
                messageId,
                { content, editedAt: new Date() },
                { new: true }
            );
            this.io.to(updatedMessage.receiver.toString()).emit('messageEdited', updatedMessage);
            res.status(200).json(updatedMessage);
        } catch (error) {
            res.status(500).json({ message: 'Error editing message: ' + error.message });
        }
    }
    
    
    
    
    

    async deleteMessage(req, res) {
        try {
            const { messageId } = req.params;
            const message = await Message.findById(messageId);

            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }

            if (message.sender.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Unauthorized to delete this message' });
            }

            await Message.findByIdAndDelete(messageId);

            // Notify about the deletion, if necessary
            this.io.to(message.receiver.toString()).emit('deleteMessage', messageId);

            res.status(200).json({ message: 'Message successfully deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting message: ' + error.message });
        }
    }
}

export default MessageController;