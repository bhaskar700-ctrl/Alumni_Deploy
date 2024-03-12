import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { addPost, addCommentToPost } from '../../redux/store/forumSlice';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.forum.posts);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('newPost', newPost => {
            dispatch(addPost(newPost));
        });

        socket.on('newComment', data => {
            dispatch(addCommentToPost(data));
        });

        return () => {
            socket.off('newPost');
            socket.off('newComment');
        };
    }, [dispatch]);

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post._id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="mt-2">{post.content}</p>
                    <CommentList comments={post.comments || []} />
                    <CreateComment postId={post._id} />
                </div>
            ))}
        </div>
    );
};

export default PostList;
