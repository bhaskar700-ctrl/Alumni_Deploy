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
    <div className="flex items-center justify-center h-screen">
  <div className="xl:mx-auto xl:container ">
    <div className="lg:px-20  px-4  py-8">
      <div className="flex flex-col-reverse border-2 border-sky-400 lg:flex-row items-center">
        <div className="w-full lg:w-1/2 md:py-9 py-6">
          <img
            src={user.avatarUrl} // Assuming avatarUrl is the URL for user avatar
            alt={`Avatar of ${user.personalDetails.firstName} ${user.personalDetails.lastName}`}
            className="lg:w-full h-full object-cover object-center w-full rounded-full overflow-hidden"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-12 lg:pr-24">
          <p className="md:text-3xl lg:text-4xl text-2xl font-semibold lg:leading-9 text-gray-800  lg:pb-10 md:pb-2 pb-2 ">
            ALUMNI INFORMATION
          </p>
          <p className="text-sm leading-5 text-gray-600  md:pb-10 pb-8">
            <p className="mb-2"><strong>Email: {user.contactInfo.email}</strong> </p>
            <p className="mb-2"><strong>Name: {user.personalDetails.firstName} {user.personalDetails.lastName}</strong> </p>
            <p className="mb-2"><strong>Working Company: {user.workExperience.length > 0 ? user.workExperience[0].companyName : 'N/A'}</strong> </p>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default UserDirectoryProfilePage;
