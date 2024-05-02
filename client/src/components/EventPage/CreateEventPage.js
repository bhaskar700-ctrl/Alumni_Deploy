import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../redux/store/eventSlice'; // Ensure this path is correct for your project structure

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    organizer: '', // Assuming you want to include an organizer field
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGoBack = () => {
    navigate(-1); // Navigating back
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic here to include the organizer ID from your user state if needed
    dispatch(createEvent(eventData))
      .unwrap()
      .then(() => {
        navigate('/events'); // Redirect to the event list page on success
      })
      .catch((error) => {
        console.error('Failed to create event:', error);
        // Optionally, display an error message to the user
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 shadow-lg p-4 border-2 border-indigo-400 rounded-lg bg-white">
  <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>
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

  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={eventData.title}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
      />
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        name="description"
        id="description"
        value={eventData.description}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
        rows="4"
      ></textarea>
    </div>
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        value={eventData.location}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
      />
    </div>
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700"> Image Link</label>
      <input
        type="text"
        name="image"
        id="image"
        value={eventData.image}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={eventData.startDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={eventData.endDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
        />
      </div>
    </div>
    {/* Include other fields as necessary */}
    <button
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Create Event
    </button>
  </form>
</div>

  );
};

export default CreateEventPage;
