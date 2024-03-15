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
    <div>
      {/* Filter dropdowns */}
      <select name="userType" value={filters.userType} onChange={handleFilterChange}>
        <option value="">Select User Type</option>
        <option value="alumni">Alumni</option>
        <option value="admin">Admin</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </select>
      {/* Add more filter dropdowns for department and programme */}

      {/* Display users */}
      <ul>
        {users.map(user => (
          <li key={user._id} onClick={() => handleUserClick(user)}> {/* Attach click handler */}
            {/* Display user details */}
            <Link to={`/user-directory/profile/${user._id}`}> {/* Link to user profile */}
                <strong>Name:</strong> {user.personalDetails.firstName} {user.personalDetails.lastName}
            </Link>

          </li>
        ))}
      </ul>

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
        </div>
      )}
    </div>
  );
};

export default UserDirectoryPage;
