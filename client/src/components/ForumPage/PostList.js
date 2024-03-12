import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { addPost } from '../../redux/store/forumSlice'; // Assuming you have an action to add a new post

const socket = io('http://localhost:3000'); // URL should match your server

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.forum.posts);

    useEffect(() => {
        // Listen for new post events and update the state
        socket.on('newPost', (newPost) => {
            dispatch(addPost(newPost));
        });

        // Cleanup the effect on component unmount
        return () => {
            socket.off('newPost');
        };
    }, [dispatch]);

    return (
        <div>
            {posts.map(post => (
                <div key={post._id}> {/* Ensure you use _id or a unique identifier */}
                    
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
