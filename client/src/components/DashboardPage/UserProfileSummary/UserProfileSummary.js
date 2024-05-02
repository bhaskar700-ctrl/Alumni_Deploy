import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/store/userSlice"; // Adjust the path to match your project structure
import { format } from "date-fns";

const UserProfileSummary = () => {
  // Placeholder user data, replace with actual data fetching logic
  const dispatch = useDispatch();
  const {
    profile: userProfile,
    error,
    status,
  } = useSelector((state) => state.user);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Example format: Jan 1, 2020. Adjust the format as needed.
    return format(date, "MMM d, yyyy");
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
    <div className="   bg-white text-gray-500 shadow rounded">
      <div className="   flex flex-col items-center py-10">
      {userProfile &&(
        <>
               <div className="w-24 h-24  p-2 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            role="img"
            className="w-full h-full overflow-hidden object-cover rounded-full"
            src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_2.png"
            alt="avatar"
          />
        </div>
        <a
          tabIndex="0"
          className="focus:outline-none focus:opacity-75 hover:opacity-75 text-gray-800  cursor-pointer focus:underline"
        >
          <h2 className="text-xl tracking-normal font-medium mb-1">
          {userProfile.personalDetails.firstName}{" "}
                {userProfile.personalDetails.lastName}
          </h2>
          <p className="text-sm text-gray-600">
                {userProfile.contactInfo.email}
              </p>
        </a>
        <a
          tabIndex="0"
          className="cursor-pointer hover:text-indigo-700 focus:underline focus:outline-none focus:text-indigo-70cd0 flex text-gray-600  text-sm tracking-normal font-normal mb-3 text-center"
        >
          <span className="cursor-pointer mr-1 text-gray-600 ">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/full_width_3_section_card-svg1.svg"
              alt="icon"
            />
          </span>
          Demow,SivaSagar
        </a>
        <p className="text-gray-600  text-sm tracking-normal font-normal mb-8 text-center w-10/12">
        <strong>Phone:</strong>{" "}
        {userProfile.contactInfo.phone || "N/A"}
        <p>
                    <strong>Address:</strong>{" "}
                    {userProfile.contactInfo.address || "N/A"}
                  </p>
        </p>
    </>
      )}
      </div>
    </div>
  );
};

export default UserProfileSummary;
