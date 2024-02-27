import React, { useState } from 'react';

function CommentComponent({ postId, authorId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/forums/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorId, content }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setContent('');
      onCommentAdded(); // Callback to refresh comments
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>Comment</button>
    </form>
  );
}
