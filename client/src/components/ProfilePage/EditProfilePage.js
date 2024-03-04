import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from '../../redux/store/userSlice'; // Adjust the import path as necessary

const EditProfilePage = () => {
  const { userId } = useParams(); // Assuming you're fetching profiles by userId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile || {});
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.personalDetails?.firstName || '',
        lastName: profile.personalDetails?.lastName || '',
        email: profile.contactInfo?.email || '',
        phone: profile.contactInfo?.phone || '',
        address: profile.contactInfo?.address || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userId, profileData: formData }))
      .unwrap()
      .then(() => navigate(`/profile/${userId}`))
      .catch((error) => console.error('Failed to update profile:', error));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-5">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
