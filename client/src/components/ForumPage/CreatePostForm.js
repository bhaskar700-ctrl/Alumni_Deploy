import React, { useState } from 'react';

function CreatePostComponent({ authorId, onPostCreated }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/forums/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorId, content }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setContent('');
      onPostCreated(); // Callback to notify parent component
    } catch (error) {
      console.error('Error creating post:', error);
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
      <button type="submit" disabled={isLoading}>Post</button>
    </form>
  );
}
