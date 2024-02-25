import React, { useState } from 'react';

const threads = [
  {
    id: 1,
    title: 'How to learn React?',
    replies: 15,
    lastPost: '2024-02-20',
    comments: [
      { id: 1, text: 'Start with the official docs.', author: 'User1' },
      // Add more comments
    ],
  },
  {
    id: 2,
    title: 'Tailwind CSS vs. Bootstrap',
    replies: 8,
    lastPost: '2024-02-18',
    comments: [
      { id: 1, text: 'I prefer Tailwind for its flexibility.', author: 'User2' },
      // Add more comments
    ],
  },
  // Add more threads as needed
];

function ForumThread() {
  const [showComments, setShowComments] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 text-justify mb-4">Discussions</h1>
        <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Post
        </button>
        <div className="bg-white p-4 rounded-lg">
          {threads.map((thread) => (
            <div key={thread.id} className="p-4 bg-white shadow rounded-lg mb-4 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer">{thread.title}</h2>
              <div className="flex justify-between items-center mt-2 text-gray-600">
                <span className="text-sm">Replies: {thread.replies}</span>
                <span className="text-sm">Last Post: {thread.lastPost}</span>
                <button
                  className="text-sm text-blue-500 hover:text-blue-700"
                  onClick={() => setShowComments(showComments === thread.id ? null : thread.id)}>
                  {showComments === thread.id ? 'Hide Comments' : 'View Comments'}
                </button>
              </div>
              {showComments === thread.id && (
                <div className="mt-4">
                  {thread.comments.map((comment) => (
                    <div key={comment.id} className="mt-2 p-2 bg-gray-200 rounded-lg">
                      <p className="text-sm">{comment.text} - <i>{comment.author}</i></p>
                    </div>
                  ))}
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
