import React from 'react';
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow';
import ChatListSidebar from './ChatListSidebar';

const ChatPage = () => {
    const activeChat = useSelector(state => state.chatting.activeChat);

    return (
        <div className="flex h-screen my-4 border-2 border-sky-700 ">
            <ChatListSidebar />
            {activeChat ? <ChatWindow /> : <div className="flex-1 flex items-center justify-center bg-gray-100">Please select a chat</div>}
        </div>
    );
};

export default ChatPage;
