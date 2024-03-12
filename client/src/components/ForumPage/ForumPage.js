import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../../redux/store/forumSlice';
import CreatePost from './CreatePost'; // Component for creating a new post
import PostList from './PostList'; // Component for displaying the list of posts

const ForumPage = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector(state => state.forum);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleCreatePost = (content) => {
        dispatch(createPost({ content }));
    };

    return (
        <div>
            <h1>Forum</h1>
            <CreatePost onCreate={handleCreatePost} />
            {status === 'loading' && <p>Loading posts...</p>}
            {error && <p>Error fetching posts: {error}</p>}
            <PostList posts={posts} />
        </div>
    );
};

export default ForumPage;
