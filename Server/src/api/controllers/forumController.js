// controllers/forumController.js
import Post from '../models/Post.js';
import User from '../models/User.js';
import NotificationController from './NotificationController.js';

const ForumController = (io) => ({
    async createPost(req, res) {
        try {
            const userId = req.user._id;
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ message: 'Content is required.' });
            }

            const newPost = new Post({ author: userId, content });
            await newPost.save();

            const users = await User.find({ _id: { $ne: userId } });
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'New Forum Post',
                    `New post created in the forum`,
                    `/posts/${newPost._id}`
                );
            });

            // Emit the new post event via Socket.IO
            // After saving the new post in your backend
            io.emit('newPost', newPost);
            console.log('Emitted new post');


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
            const post = await Post.findById(postId);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const authorId = req.user._id;

            const comment = {
                author: authorId,
                content,
                createdAt: new Date()
            };
            post.comments.push(comment);
            await post.save();

            const uniqueUserIds = new Set(post.comments.map(comment => comment.author.toString()));
            uniqueUserIds.add(post.author.toString());
            uniqueUserIds.delete(authorId.toString());

            uniqueUserIds.forEach(userId => {
                NotificationController.createNotification(
                    userId,
                    'New Comment',
                    `New comment on a post you're following`,
                    `/posts/${postId}`
                );
            });

            // Emit the new comment event via Socket.IO
            io.emit('newComment', { postId, comment });

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
});

export default ForumController;
