import React, { useState, useRef, useEffect } from 'react';

const CreatePost = ({ onCreate }) => {
    const [content, setContent] = useState('');
    const [showPostForm, setShowPostForm] = useState(false);
    const postFormRef = useRef(null);

    const handleSubmit = () => {
        onCreate(content);
        setContent('');
        setShowPostForm(false); // Close the post form overlay after submission
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (postFormRef.current && !postFormRef.current.contains(event.target)) {
                setShowPostForm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {showPostForm && (
                <div className="post-form-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div ref={postFormRef} className="post-form bg-white p-10 rounded-lg relative">
                        <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowPostForm(false)}>
                            &#10005;
                        </button>
                        <form onSubmit={handleSubmit} className="w-full">
                            <textarea
                                className="border p-2 rounded mb-4 w-full h-40"
                                placeholder="Write something..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="create-post-textarea">
                <textarea
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Write something..."
                    onClick={() => setShowPostForm(true)} // Show the post form when clicked
                ></textarea>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Post
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
