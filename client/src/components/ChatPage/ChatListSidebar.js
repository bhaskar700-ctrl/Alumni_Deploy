import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchUsers, 
    toggleUsersList, 
    setActiveChat, 
    fetchConversations, 
    fetchConversationsList
} from '../../redux/store/chattingSlice';

const ChatListSidebar = () => {
    const dispatch = useDispatch();
    // Use a default empty array if users or conversationsList is undefined
    const { users = [], conversationsList = [], showUsersList, activeChat } = useSelector(state => state.chatting);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchConversationsList());
    }, [dispatch]);

    const handleToggleUsersList = () => {
        dispatch(toggleUsersList());
    };

    const handleUserClick = (user) => {
        dispatch(setActiveChat(user));
        dispatch(fetchConversations(user._id));
    };

    const handleConversationClick = (conversation) => {
        dispatch(setActiveChat(conversation.userDetails));
        dispatch(fetchConversations(conversation._id));
    };

    return (
        <div className="w-64 bg-gray-100 border-r h-full">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">{showUsersList ? 'Users' : 'Chats'}</h2>
                <button
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                    onClick={handleToggleUsersList}
                >
                    {showUsersList ? 'Show Chats' : 'Show Users'}
                </button>
            </div>
            <ul className="overflow-y-auto">
                {showUsersList ? 
                    users.map(user => (
                        <li 
                            key={user._id} 
                            onClick={() => handleUserClick(user)}
                            className={`p-4 cursor-pointer hover:bg-gray-200 ${activeChat && activeChat._id === user._id ? 'bg-blue-100' : ''}`}
                        >
                            {user.personalDetails.firstName} {user.personalDetails.lastName}
                        </li>
                    )) : 
                    conversationsList.map(conversation => (
                        <li 
                            key={conversation._id} 
                            onClick={() => handleConversationClick(conversation)}
                            className={`p-4 cursor-pointer hover:bg-gray-200 ${activeChat && activeChat._id === conversation.userDetails._id ? 'bg-blue-100' : ''}`}
                        >
                            {conversation.userDetails.personalDetails.firstName} {conversation.userDetails.personalDetails.lastName}: {conversation.lastMessage.content}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ChatListSidebar;
