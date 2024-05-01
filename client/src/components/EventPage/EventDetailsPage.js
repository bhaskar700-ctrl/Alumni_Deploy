import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventById } from "../../redux/store/eventSlice"; // Adjust import paths as necessary

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { event, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

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
    </div>
  );
};

export default EventDetailsPage;
