import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, fetchConversations } from '../../redux/store/chattingSlice';

const ChatWindow = () => {
    const dispatch = useDispatch();
    const { activeChat, conversations } = useSelector(state => state.chatting);
    const [message, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredConversations, setFilteredConversations] = useState([]);

    useEffect(() => {
        if (activeChat && activeChat._id) {
            dispatch(fetchConversations({ userId: activeChat._id }));
        }
    }, [dispatch, activeChat]);

    useEffect(() => {
        setFilteredConversations(
            conversations.filter(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [conversations, searchQuery]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '' && activeChat && activeChat._id) {
            dispatch(sendMessage({ receiverId: activeChat._id, content: message }));
            setNewMessage('');
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-lime flex items-center justify-between">
                <h3>{activeChat ? activeChat.name : 'Select a chat'}</h3>
                <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex-1 overflow-y-auto bg-indigo-100 p-4">
                {filteredConversations.map((msg, index) => (
                    <div key={index} className="p-2 flex items-center">
                        {/* User photo */}
                        <div className="w-8 h-8 overflow-hidden rounded-full mr-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>{msg.content}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex bg-white">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-l"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded-r">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
