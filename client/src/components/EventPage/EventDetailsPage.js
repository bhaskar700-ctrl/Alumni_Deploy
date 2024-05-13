import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importing useNavigate
import { useSelector, useDispatch } from "react-redux";
import { fetchEventById } from "../../redux/store/eventSlice"; // Adjust import paths as necessary

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate
  const { event, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

  const handleGoBack = () => {
    navigate(-1); // Navigating back
  };

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold my-4">{error}</div>
    );
  }

  if (status === "loading" || !event) {
    return (
      <div className="text-center text-gray-500 font-semibold my-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="border-2 border-sky-500 max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold my-4 text-blue-600">
            {event.title}
          </h1>

          <div className="mb-4">
            <p className="text-lg font-semibold">Description:</p>
            <p className="mt-1 text-gray-700">{event.description}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Location:</p>
            <p className="mt-1 text-gray-700">{event.location}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Start Date:</p>
            <p className="mt-1 text-gray-700">
              {new Date(event.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">End Date:</p>
            <p className="mt-1 text-gray-700">
              {event.endDate
                ? new Date(event.endDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="hidden lg:block lg:w-3/5 xl:w-3/5 w-full lg:mt-0 mt-6">
          <img
            src="https://i.ibb.co/SKLJ7WX/austin-distel-jp-Hw8ndw-J-Q-unsplash-1.png"
            alt="ongoing meeting"
            className="w-full obejct-fit object-center object-fill h-full"
          />
        </div>
      </div>
      <button onClick={handleGoBack} className="absolute top-4 right-4">
        {/* Insert your back button icon here */}
        {/* For example, using an SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
    </div>
  );
};

export default EventDetailsPage;
