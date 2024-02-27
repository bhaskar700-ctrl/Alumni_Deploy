// src/components/PostItem.js
import React, { useState } from 'react';
import { commentOnPost } from '../api/forumApi';

const PostItem = ({ post }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentOnPost(post._id, { content: comment });
      setComment('');
      // Ideally, refresh the post to show the new comment
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{post.content}</h3>
      {/* Display comments */}
      {post.comments && post.comments.map(c => (
        <div key={c._id}>{c.content}</div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default PostItem;
