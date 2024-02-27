import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, createPost, createComment } from '../../redux/store/forumSlice';

const ForumPage = () => {
    const dispatch = useDispatch();
    const { posts, status, error, createStatus, createError } = useSelector((state) => state.forum);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handlePostClick = (postId) => {
        setSelectedPostId(selectedPostId === postId ? null : postId);
    };

    const handleNewPostSubmit = async (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;
        await dispatch(createPost(newPostContent));
        setNewPostContent('');
    };

    const handleNewCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newCommentContent.trim() || !selectedPostId) return;
        await dispatch(createComment({ postId: selectedPostId, commentContent: newCommentContent }));
        setNewCommentContent('');
    };

    // Prevent event propagation to keep the comment form visible
    const preventClickPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="forum-page bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">Forum</h1>
            <div className="create-post mb-8">
                <form onSubmit={handleNewPostSubmit} className="flex flex-col gap-2">
                    <textarea
                        className="border p-2 rounded"
                        placeholder="Write something..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" disabled={createStatus === 'loading'}>
                        {createStatus === 'loading' ? 'Posting...' : 'Post'}
                    </button>
                </form>
            </div>
            {createStatus === 'failed' && <div className="text-red-600">Error creating post: {createError}</div>}
            {status === 'loading' && <div>Loading posts...</div>}
            {status === 'failed' && <div className="text-red-600">Error fetching posts: {error}</div>}
            <div className="posts-list">
                {status === 'succeeded' && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post bg-white rounded shadow-md p-4 mb-6 cursor-pointer" onClick={() => handlePostClick(post._id)}>
                            <h3 className="text-lg font-semibold">{post.title || 'Post'}</h3>
                            <p className="text-sm text-gray-500 mb-2">By {post.author?.personalDetails?.firstName} {post.author?.personalDetails?.lastName}</p>
                            <p className="mt-2">{post.content}</p>
                            {selectedPostId === post._id && (
                                <>
                                    <div className="comments mt-4" onClick={preventClickPropagation}>
                                        <h4 className="text-md font-semibold">Comments</h4>
                                        {post.comments.length > 0 ? (
                                            post.comments.map((comment, index) => (
                                                <div key={`comment-${index}`} className="comment bg-gray-200 rounded p-2 my-2">
                                                    <p>{comment.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No comments yet</p>
                                        )}
                                    </div>
                                    <form onSubmit={handleNewCommentSubmit} className="flex flex-col gap-2 mt-4" onClick={preventClickPropagation}>
                                        <textarea
                                            className="border p-2 rounded"
                                            placeholder="Write a comment..."
                                            value={newCommentContent}
                                            onChange={(e) => setNewCommentContent(e.target.value)}
                                            required
                                        ></textarea>
                                        <button type="submit" className="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                            Post Comment
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center mt-4">No posts to display</p>
                )}
            </div>
        </div>
    );
};

export default ForumPage;
