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
      <h2 className="text-xl font-bold mb-4">Events</h2>
      <Link to="/events/create" className="mb-4 inline-block bg-blue-500 text-white p-2 rounded">Create Event</Link>
      <ul>
        {events.map((event) => (
          <li key={event._id} className="mb-2 p-2 border rounded">
            <h3 className="font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <div className="mt-2">
              <Link to={`/events/${event._id}`} className="mr-2 text-blue-500">View Details</Link>
              <Link to={`/events/edit/${event._id}`} className="text-blue-500">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
