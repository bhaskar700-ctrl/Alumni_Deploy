import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/store/userSlice'; // Adjust the path to match your project structure
import { format } from 'date-fns';


const UserProfilePage = () => {
    const dispatch = useDispatch();
    const { profile: userProfile, error, status } = useSelector((state) => state.user);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example format: Jan 1, 2020. Adjust the format as needed.
        return format(date, 'MMM d, yyyy');
      };

    useEffect(() => {
        dispatch(fetchUserProfile()); // Assuming authentication determines the user
    }, [dispatch]);

    if (status === 'loading') {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-5">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg mt-5 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">User Profile</h1>
            {userProfile && (
                <>
                    <div className="text-center mb-4">
                        <img src={userProfile.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="rounded-full h-32 w-32 mx-auto"/>
                        <h2 className="text-lg font-semibold">{userProfile.personalDetails.firstName} {userProfile.personalDetails.lastName}</h2>
                        <p className="text-sm text-gray-600">{userProfile.contactInfo.email}</p>
                        {/* Link to Edit Profile */}
                        <Link to={`/edit-profile/${userProfile._id}`} className="text-blue-600 hover:underline">Edit Profile</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Contact Information</h3>
                            <p><strong>Phone:</strong> {userProfile.contactInfo.phone || 'N/A'}</p>
                            <p><strong>Address:</strong> {userProfile.contactInfo.address || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Education History</h3>
                            {userProfile.educationHistory.length > 0 ? (
                                userProfile.educationHistory.map((education, index) => (
                                    <div key={index} className="mb-3">
                                        <p><strong>Institution:</strong> {education.institutionName}</p>
                                        <p><strong>Degree:</strong> {education.degree}</p>
                                        <p><strong>Year of Graduation:</strong> {education.yearOfGraduation}</p>
                                        <p><strong>Activities:</strong> {education.activities.join(', ') || 'N/A'}</p>
                                    </div>
                                ))
                            ) : <p>N/A</p>}
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Experience</h3>
                            {
                                userProfile.workExperience.length > 0 ? (
                                  userProfile.workExperience.map((work, index) => (
                                    <div key={index} className="mb-3">
                                      <p><strong>Company:</strong> {work.companyName}</p>
                                      <p><strong>Position:</strong> {work.position}</p>
                                      <p><strong>Start Date:</strong> {formatDate(work.startDate)}</p>
                                      <p><strong>End Date:</strong> {work.endDate ? formatDate(work.endDate) : 'Current'}</p>
                                      <p><strong>Description:</strong> {work.description || 'N/A'}</p>
                                    </div>
                                  ))
                                ) : <p>N/A</p>
                              }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfilePage;
