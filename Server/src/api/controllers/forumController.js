// Import necessary modules and files
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';
import NotificationController from './NotificationController.js';

// Define the ForumController function
const ForumController = (io) => ({
    async createPost(req, res) {
        try {
            const userId = req.user._id;
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ message: 'Content is required.' });
            }

            let newPost = new Post({ author: userId, content });
            await newPost.save();
            newPost = await Post.findById(newPost._id).populate('author');

            const users = await User.find({ _id: { $ne: userId } });
            users.forEach(user => {
                if (mongoose.Types.ObjectId.isValid(user._id)) {
                    NotificationController.createNotification(
                        user._id,
                        'New Forum Post',
                        'New post created in the forum',
                        `/posts/${newPost._id}`
                    );
                } else {
                    console.error('Invalid user ID:', user._id);
                }
            });

            io.emit('newPost', newPost);

            res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ message: 'An error occurred while creating the post.' });
        }
    },

    async commentOnPost(req, res) {
        try {
            const { postId } = req.params;
            const { content } = req.body;

            let post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const comment = { author: req.user._id, content, createdAt: new Date() };
            post.comments.push(comment);
            await post.save();

            post = await Post.findById(postId).populate('author').populate('comments.author');

            const newComment = post.comments[post.comments.length - 1];

            const uniqueUserIds = new Set(post.comments.map(comment => comment.author.toString()));
            uniqueUserIds.add(post.author.toString());
            uniqueUserIds.delete(req.user._id.toString());

            uniqueUserIds.forEach(userId => {
                if (mongoose.Types.ObjectId.isValid(userId)) {
                    NotificationController.createNotification(
                        userId,
                        'New Comment',
                        `New comment on your post ${post.title}`,
                        `/posts/${postId}`
                    );
                } else {
                    console.error('Invalid user ID:', userId);
                }
            });

            io.emit('newComment', { postId, comment: newComment });

            res.status(200).json({ message: 'Comment added successfully', post });
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ message: 'An error occurred while adding the comment.' });
        }
    },

    async getAllPosts(req, res) {
        try {
            const posts = await Post.find()
                                    .populate('author')
                                    .populate('comments.author');  // This should populate the author in the comments
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ message: 'An error occurred while fetching the posts.' });
        }
    },
    
    async getPost(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findById(postId)
                                   .populate('author')
                                   .populate('comments.author');  // Ensure consistent population here as well
    
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
    
            res.status(200).json(post);
        } catch (error) {
            console.error("Error fetching post:", error);
            res.status(500).json({ message: 'An error occurred while fetching the post.' });
        }
    }
    
});

// Export the ForumController
export default ForumController;
