import React, { useState } from 'react';

const CreatePost = ({ onCreate }) => {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        onCreate(content);
        setContent(''); // Clear the input after submitting
    };

    return (
        <div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write something..."
            />
            <button onClick={handleSubmit}>Post</button>
        </div>
    );
};

export default CreatePost;
