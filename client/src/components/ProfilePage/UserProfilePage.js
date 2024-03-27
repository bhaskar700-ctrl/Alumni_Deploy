import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/store/userSlice"; // Adjust the path to match your project structure
import { format } from "date-fns";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { profile: userProfile, error, status } = useSelector((state) => state.user);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy"); // Example format: Jan 1, 2020. Adjust as needed.
  };

  useEffect(() => {
    dispatch(fetchUserProfile()); // Assuming authentication determines the user
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-5">{error}</div>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg border-2 border-sky-200 mt-5 space-y-4">
        {userProfile && (
          <>
            <div aria-label="cards" className="bg-white dark:bg-gray-800 shadow rounded">
              <div className="relative">
                <img
                  tabIndex="0"
                  className="focus:outline-none h-56 shadow rounded-t border-2 w-full object-cover object-center"
                  src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png"
                  alt="mountains cover"
                />
                <img
                  src={userProfile.profilePicture || "https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small_2x/happy-young-cute-illustration-face-profile-png.png"}
                  alt="Profile"
                  className="rounded-md h-32 w-32 mx-auto border-2 absolute bottom-0 -mb-12 left-1/2 transform -translate-x-1/2"
                />
              </div>
            </div>

            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold">
                {userProfile.personalDetails.firstName} {userProfile.personalDetails.lastName}
              </h2>
              <p className="text-sm text-gray-600">
                {userProfile.contactInfo.email}
              </p>
              <Link
                to={`/edit-profile/${userProfile._id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Edit Profile
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white border-2 border-indigo-500 shadow rounded w-full md:w-auto">
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Education History</h3>
                  {userProfile.educationHistory.length > 0 ? (
                    userProfile.educationHistory.map((education, index) => (
                      <div key={index} className="mb-3">
                        <p><strong>Institution:</strong> {education.institutionName}</p>
                        <p><strong>Degree:</strong> {education.degree}</p>
                        <p><strong>Year of Graduation:</strong> {education.yearOfGraduation}</p>
                        <p><strong>Activities:</strong> {education.activities.join(", ") || "N/A"}</p>
                      </div>
                    ))
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>

              <div className="bg-white border-2 border-indigo-500 shadow rounded w-full md:w-auto">
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Contact Information</h3>
                  <p><strong>Phone:</strong> {userProfile.contactInfo.phone || "N/A"}</p>
                  <p><strong>Address:</strong> {userProfile.contactInfo.address || "N/A"}</p>
                </div>
              </div>

              <div className="bg-white border-2 border-indigo-500 shadow rounded w-full md:w-auto">
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Work Experience</h3>
                  {userProfile.workExperience.length > 0 ? (
                    userProfile.workExperience.map((work, index) => (
                      <div key={index} className="mb-3">
                        <p><strong>Company:</strong> {work.companyName}</p>
                        <p><strong>Position:</strong> {work.position}</p>
                        <p><strong>Start Date:</strong> {formatDate(work.startDate)}</p>
                        <p><strong>End Date:</strong> {work.endDate ? formatDate(work.endDate) : "Current"}</p>
                        <p><strong>Description:</strong> {work.description || "N/A"}</p>
                      </div>
                    ))
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfilePage;
