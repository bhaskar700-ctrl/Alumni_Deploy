import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDirectoryProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/directory/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render user profile details */}
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.personalDetails.firstName} {user.personalDetails.lastName}
      </div>
      <div>
        <strong>Email:</strong> {user.contactInfo.email}
      </div>
      <div>
        <strong>Working Company:</strong> {user.workExperience.length > 0 ? user.workExperience[0].companyName : 'N/A'}
      </div>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default UserDirectoryProfilePage;
