import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchUsers, 
    toggleUsersList, 
    setActiveChat, 
    fetchConversations, 
    fetchConversationsList
} from '../../redux/store/chattingSlice';

// Assume you have imported the necessary icons from Font Awesome
// Example: import { FaUser } from 'react-icons/fa';

const ChatListSidebar = () => {
    const dispatch = useDispatch();
    const { users = [], conversationsList = [], showUsersList, activeChat } = useSelector(state => state.chatting);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchConversationsList());
    }, [dispatch]);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user => 
                user.personalDetails.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.personalDetails.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [users, searchQuery]);

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
            <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
                <h2 className="text-lg font-semibold">{showUsersList ? 'Users' : 'Chats'}</h2>
                <button
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                    onClick={handleToggleUsersList}
                >
                    {showUsersList ? 'Show Chats' : 'Show Users'}
                </button>
            </div>
            <div className="p-4">
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Search users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <ul className="overflow-y-auto">
                {filteredUsers.map(user => (
                    <li 
                        key={user._id} 
                        onClick={() => handleUserClick(user)}
                        className={`p-4 cursor-pointer hover:bg-gray-200 ${activeChat && activeChat._id === user._id ? 'bg-blue-100' : ''}`}
                    >
                        {/* Circular user photo */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
                                <img src="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_female_icon_192701.png" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                {user.personalDetails.firstName} {user.personalDetails.lastName}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatListSidebar;
