import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Updated import

const ForumHeader = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <div className="relative flex-1 max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" /> {/* Updated icon usage */}
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Type to search..."
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
          <BellIcon className="h-6 w-6" />
        </button>
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default ForumHeader;
