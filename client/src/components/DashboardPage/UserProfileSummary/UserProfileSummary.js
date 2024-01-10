import React from 'react';
// Import profile picture or use a placeholder
// import profilePic from '/path/to/profile-picture.jpg';

const UserProfileSummary = () => {
    // Placeholder user data, replace with actual data fetching logic
    const userProfile = {
        name: 'Alumni Name',
        graduationYear: '2009',
        currentRole: 'Software Developer',
        profilePic: '/path/to/profile-picture.jpg', // Replace with actual image path or import
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="flex items-center space-x-4">
                <img 
                    src={userProfile.profilePic} 
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                    <p className="text-gray-600">Class of {userProfile.graduationYear}</p>
                    <p className="text-gray-600">{userProfile.currentRole}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfileSummary;
