import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { addPost, addCommentToPost } from '../../redux/store/forumSlice';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.forum.posts);
    const [showComments, setShowComments] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('newPost', newPost => {
            dispatch(addPost(newPost));
        });

        socket.on('newComment', (data) => {
            dispatch(addCommentToPost(data));
        });

        return () => {
            socket.off('newPost');
            socket.off('newComment');
        };
    }, [dispatch]);

    const toggleComments = postId => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleLike = postId => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId)); // Unlike the post
        } else {
            setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]); // Like the post
        }
    };

    return (
        <div className="space-y-4">
            {posts.map(post => {
                const personalDetails = post.author?.personalDetails;
                const { firstName, lastName, profilePicture } = personalDetails || {};

                if (!firstName || !lastName) {
                    return null; // Skip rendering the post if author details are unknown
                }

                return (
                    <div key={post._id} className="p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center">
                            {profilePicture ? (
                                <img 
                                    src={profilePicture} 
                                    alt={`${firstName} ${lastName}`} 
                                    className="h-10 w-10 rounded-full mr-2" />
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
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <FaThumbsUp 
                                    className={`mr-3 cursor-pointer ${likedPosts.includes(post._id) ? 'text-red-500' : ''}`} 
                                    onClick={() => handleLike(post._id)} 
                                />
                                <span>{likedPosts.filter(id => id === post._id).length}</span>
                                <FaComment className="cursor-pointer" onClick={() => toggleComments(post._id)} />
                            </div>
                        </div>
                        {showComments[post._id] && (
                            <>
                                <CommentList comments={post.comments || []} />
                                <CreateComment postId={post._id} />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PostList;
