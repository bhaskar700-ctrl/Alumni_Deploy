// controllers/forumController.js
import Post from '../models/Post.js';

const ForumController = {
    async createPost(req, res) {
        try {
            const { authorId, content } = req.body;
            const newPost = new Post({ author: authorId, content });
            await newPost.save();

            // Notify users about the new forum post
            // Adjust the logic below to determine who should be notified
            const users = await User.find({}); 
            users.forEach(user => {
                if (user._id.toString() !== authorId) { // Avoid notifying the author
                    NotificationController.createNotification(
                        user._id,
                        'New Forum Post',
                        `New post created in the forum`,
                        `/posts/${newPost._id}`
                    );
                }
            });

            res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
