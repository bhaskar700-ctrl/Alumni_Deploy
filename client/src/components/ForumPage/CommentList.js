import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <div className="mt-4">
            {comments.map(comment => (
                <div key={comment._id} className="mt-2 p-2 bg-gray-100 rounded">
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
