import React from 'react';
import ForumHeader from './ForumHeader'; // Ensure the import path is correct
import ForumSidebar from './ForumSidebar'; // Ensure the import path is correct
import ForumThread from './ForumThread'; // Ensure the import path is correct

const ForumPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ForumHeader className="shadow-md" />
      <div className="flex flex-1 bg-white overflow-hidden">
        {/* Sidebar with improved styling and a right border as a separator */}
        <div className="w-64 h-full flex-none overflow-y-auto border-r border-gray-300">
          <ForumSidebar />
        </div>
        {/* Main content area with padding and margin for better spacing */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <ForumThread />
        </div>
      </div>
    </div>
  );
}

export default ForumPage;

