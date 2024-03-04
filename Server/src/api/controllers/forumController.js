// controllers/forumController.js
import Post from '../models/Post.js';
import User from '../models/User.js';
import NotificationController from './NotificationController.js';

const ForumController = {
    async createPost(req, res) {
        try {
            // Assuming you've added middleware that validates the token and attaches the user to req
            const userId = req.user._id; // Get the authenticated user's ID from the request
            const { content } = req.body;
    
            // Validate the existence of content
            if (!content) {
                return res.status(400).json({ message: 'Content is required.' });
            }
    
            const newPost = new Post({ author: userId, content });
            await newPost.save();
    
            // Notify other users about the new forum post
            const users = await User.find({ _id: { $ne: userId } }); // Exclude the author
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'New Forum Post',
                    `New post created in the forum`,
                    `/posts/${newPost._id}`
                );
            });
    
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
            console.error("Error creating post:", error); // Log the specific error for debugging
            res.status(500).json({ message: 'An error occurred while creating the post.' });
        }
    },
    



    async commentOnPost(req, res) {
        try {
            const { postId } = req.params;
            const { authorId, content } = req.body;
            const post = await Post.findById(postId);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            post.comments.push({
                author: authorId,
                content,
                createdAt: new Date()
            });
            await post.save();

            // Notify the post author and other commenters (excluding the current commenter)
            const uniqueUserIds = new Set(post.comments.map(comment => comment.author.toString()));
            uniqueUserIds.add(post.author.toString());
            uniqueUserIds.delete(authorId); // Remove current commenter

            uniqueUserIds.forEach(userId => {
                NotificationController.createNotification(
                    userId,
                    'New Comment',
                    `New comment on a post you're following`,
                    `/posts/${postId}`
                );
            });

            res.status(200).json({ message: 'Comment added successfully', post });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllPosts(req, res) {
        try {
            const posts = await Post.find().populate('author').populate('comments.author');
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getPost(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findById(postId).populate('author').populate('comments.author');

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ForumController;
