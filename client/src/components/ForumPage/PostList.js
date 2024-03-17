import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
            {posts.map(post => {
                // Extracting personalDetails here for clarity
                const personalDetails = post.author?.personalDetails;

                if (!personalDetails) {
                    return null; // Skip rendering if personalDetails are not available
                }

                const { firstName, lastName, profilePicture } = personalDetails;

                return (
                    <div key={post._id} className="p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center">
                            {profilePicture ? (
                                <img 
                                    src={profilePicture} 
                                    alt={`${firstName} ${lastName}`} 
                                    className="h-10 w-10 rounded-full mr-2" 
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUser} className="h-10 w-10 rounded-full mr-2 text-gray-400" />
                            )}
                            <div>
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <p className="text-sm text-gray-600">
                                    Author: {firstName} {lastName}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2">{post.content}</p>
                        <CommentList comments={post.comments || []} />
                        <CreateComment postId={post._id} />
                    </div>
                );
            })}
        </div>
    );
};

export default PostList;
