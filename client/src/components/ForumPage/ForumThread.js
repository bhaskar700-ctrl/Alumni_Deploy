import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ForumThread() {
    const [threads, setThreads] = useState([]);
    const [showComments, setShowComments] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Ensure this URL matches your server's configuration
                const response = await axios.get('http://localhost:3000/api/forums/posts');
                setThreads(response.data);
            } catch (error) {
                console.error("Failed to fetch forum posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // This function toggles the visibility of comments for each thread
    const toggleComments = (threadId) => {
        setShowComments(showComments === threadId ? null : threadId);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Discussions</h1>
                {/* You can add functionality to this button later */}
                <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Post
                </button>
                <div className="bg-white p-4 rounded-lg shadow">
                    {threads.map((thread) => (
                        <div key={thread._id} className="p-4 bg-white rounded-lg mb-4 shadow hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer">
                                {thread.title}
                            </h2>
                            <div className="flex justify-between items-center mt-2 text-gray-600">
                                <span className="text-sm">Replies: {thread.replies}</span>
                                <span className="text-sm">Last Post: {thread.lastPost}</span>
                                <button
                                    className="text-sm text-blue-500 hover:text-blue-700"
                                    onClick={() => toggleComments(thread._id)}>
                                    {showComments === thread._id ? 'Hide Comments' : 'View Comments'}
                                </button>
                            </div>
                            {showComments === thread._id && (
                                <div className="mt-4">
                                    {thread.comments.map((comment) => (
                                        <div key={comment._id} className="mt-2 p-2 bg-gray-200 rounded-lg">
                                            <p className="text-sm">{comment.text} - <i>{comment.author}</i></p>
                                        </div>
                                    ))}
                                    {/* You can add functionality to this button later */}
                                    <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">
                                        Reply
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ForumThread;
