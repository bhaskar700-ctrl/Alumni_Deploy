import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/store/eventSlice'; // Adjust import path
import { Link } from 'react-router-dom';

const EventListPage = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl text-center font-bold mb-4">Events</h2>
      <Link to="/events/create" className="mb-4 inline-block bg-blue-500 text-white p-2 rounded">Create Event</Link>
      <div className="py-10 grid gap-x-8 gap-y-4 grid-cols-3">
      {events.map((event) => (
        <div key={event._id} className="bg-white p-4 rounded shadow-md w-fit">
          <div style={{ height: "200px", width: "300px" }}>
            <img
              className="w-full h-full object-cover rounded"
              alt="event"
              src="https://miro.medium.com/v2/resize:fit:900/1*cRSs6Icwnk2qQ9yLzEi8jg.png" // Replace with a placeholder image URL
            />
          </div>
          <h1 className="text-2xl font-medium mt-2">{event.title}</h1>
          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
          <div className="mt-4">
            <Link to={`/events/${event._id}`} className="bg-[#f02e65] text-white py-2 px-4 rounded mr-2">
              View Details
            </Link>
            <Link to={`/events/edit/${event._id}`} className="bg-gray-100 text-gray-700 py-2 px-4 rounded">
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default EventListPage;
