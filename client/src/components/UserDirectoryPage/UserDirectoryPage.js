import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const UserDirectoryPage = () => {
  // State variables to store users, filter criteria, and selected user
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    userType: '',
    department: '',
    programme: ''
  });
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user

  // Function to fetch users based on filters
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/directory/users', { params: filters });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when component mounts or filters change
  useEffect(() => {
    fetchUsers();
  }, [filters]);

  // Function to handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  // Function to handle user selection
  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user when clicked
  };

  return (
    <>
      <div>
        <div className='mb-15'>
          {/* Filter dropdowns */}
          <select name="userType" value={filters.userType} onChange={handleFilterChange}>
            <option  classname="border-2 border-sky-950 " value="">Select User Type</option>
            <option value="alumni">Alumni</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          {/* Add more filter dropdowns for department and programme */}
        </div>

        {/* Add space between filter and user cards */}
        <div className="mb-8"></div>

        {/* Display users */}
        <div className="grid grid-cols-1 mt-15 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <div key={user._id} onClick={() => handleUserClick(user)}>
              <Link to={`/user-directory/profile/${user._id}`}>
                <div className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:bg-gray-200 cursor-pointer">
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto"
                    src={user.avatarUrl} // Assuming avatarUrl is the URL for user avatar
                    alt={`Avatar of ${user.personalDetails.firstName} ${user.personalDetails.lastName}`}
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 text-center">
                    {user.personalDetails.firstName} {user.personalDetails.lastName}
                  </h5>
                  <p className="text-sm text-gray-500 text-center">
                    {user.userType}
                  </p>
                  {/* Add LinkedIn and Message buttons */}
                  {user.userType === 'alumni' && (
                    <div className="flex justify-center mt-4 space-x-3">
                      <a
                        href={user.linkedin}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus-ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus-ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                      >
                        Message
                      </a>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Display selected user profile */}
        {selectedUser && (
          <div>
            {/* Render user profile details */}
            <h2>User Profile</h2>
            <div>
              <strong>Name:</strong> {selectedUser.personalDetails.firstName} {selectedUser.personalDetails.lastName}
            </div>
            <div>
              <strong>Email:</strong> {selectedUser.contactInfo.email}
            </div>
            <div>
              <strong>Working Company:</strong> {selectedUser.workExperience.length > 0 ? selectedUser.workExperience[0].companyName : 'N/A'}
            </div>
            {/* Add more profile details as needed */}

            {/* Add LinkedIn and Message buttons */}
          </div>

        )}
      </div>
    </>
  );
};

export default UserDirectoryPage;
