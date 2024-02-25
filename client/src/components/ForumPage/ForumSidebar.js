import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom for navigation

const ForumSidebar = () => {
  return (
    <div className="h-full w-64 bg-white text-black">
      <div className="flex flex-col p-5">
        <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Forum Sections</h2>
        <ul className="flex flex-col gap-3">
          <li>
            <Link to="/" className="hover:bg-gray-700 p-3 rounded-md transition duration-150 ease-in-out">
              My Questions
            </Link>
          </li>
          <li>
            <Link to="/participation" className="hover:bg-gray-700 p-3 rounded-md transition duration-150 ease-in-out">
              My Participations
            </Link>
          </li>
          <li>
            <Link to="/solved" className="hover:bg-gray-700 p-3 rounded-md transition duration-150 ease-in-out">
              Solved
            </Link>
          </li>
          <li>
            <Link to="/unsolved" className="hover:bg-gray-700 p-3 rounded-md transition duration-150 ease-in-out">
              Unsolved
            </Link>
          </li>
          <li>
            <Link to="/discussions" className="hover:bg-gray-700 p-3 rounded-md transition duration-150 ease-in-out">
              Discussions
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
}

export default ForumSidebar;
