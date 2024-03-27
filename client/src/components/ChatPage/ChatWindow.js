import React, { useState, useEffect } from 'react'; // Add useEffect to the import statement
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, fetchConversations } from '../../redux/store/chattingSlice';

const ChatWindow = () => {
    const dispatch = useDispatch();
    const { activeChat, conversations } = useSelector(state => state.chatting);
    const [message, setNewMessage] = useState('');

    useEffect(() => {
        if (activeChat && activeChat._id) {
            dispatch(fetchConversations({ userId: activeChat._id }));
        }
    }, [dispatch, activeChat]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '' && activeChat && activeChat._id) {
            dispatch(sendMessage({ receiverId: activeChat._id, content: message }));
            setNewMessage('');
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b">
                <h3>{activeChat ? activeChat.name : 'Select a chat'}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {conversations.map((msg, index) => (
                    <div key={index} className="p-2">
                        {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-l"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
