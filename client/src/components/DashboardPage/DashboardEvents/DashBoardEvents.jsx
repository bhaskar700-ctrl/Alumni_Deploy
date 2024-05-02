import React, { useEffect } from 'react'; // Import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/store/eventSlice'; // Adjust import path
import { Link } from 'react-router-dom';

function DashBoardEvents() {
    const dispatch = useDispatch();
    const { events, status, error } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]); // Call dispatch(fetchEvents()) when the component mounts

    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Get the latest event
    const latestEvent = events.length > 0 ? events[0] : null;

    return (
        <>
            {/* Content on the left */}
            <div className="w-full lg:w-1/2">
            {latestEvent && ( // Check if latestEvent exists before rendering
                <div
                    aria-label="card"
                    className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6"
                >
                   
                        <div className="flex justify-between items-center lg:items-start flex-row-reverse lg:flex-col">
                            <h4 className="text-base text-indigo-700 dark:text-indigo-600 tracking-normal leading-4">
                                12:00pm
                            </h4>
                            <h4 className="lg:mt-3 text-gray-600  text-base font-normal">
                                23 December, Sunday
                            </h4>
                        </div>
                
                    <a
                        tabIndex="0"
                        className="focus:outline-none focus:underline focus:text-gray-500 hover:text-gray-500 cursor-pointer text-gray-800 "
                    >
                        <h2 className="mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">
                            {latestEvent.title} {/* Render latest event title */}
                        </h2>
                    </a>
                    <p className="mb-6 font-normal text-gray-600 dark:text-gray-400 text-sm tracking-normal w-11/12 lg:w-9/12">
                        {latestEvent.description} {/* Render latest event description */}
                    </p>
                    <div className="flex lg:items-center items-start flex-col lg:flex-row">
                        <div className="flex items-center">
                            <div className="border-2 border-white dark:border-gray-700 shadow rounded-full w-6 h-6">
                                <img
                                    className="w-full h-full overflow-hidden object-cover rounded-full"
                                    src={latestEvent.avatar} 
                                    alt="avatar"
                                />
                            </div>
                            {/* Add more avatar images as needed */}
                            <a
                                tabIndex="0"
                                className="cursor-pointer text-gray-600 focus:outline-none focus:underline focus:text-gray-400 hover:text-gray-500"
                            >
                                <p className=" text-xs font-normal ml-1">+12 Attendees</p>
                            </a>
                        </div>
                        <button className="text-gray-600  focus:outline-none hover:text-indigo-700 focus:text-indigo-700 mt-4 lg:mt-0 ml-0 lg:ml-12 flex items-end">
                            <span className="mr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-map-pin"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="12" cy="11" r="3" />
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                            </span>
                            <p className="text-sm tracking-normal font-normal text-center">
                                {latestEvent.location} {/* Render latest event location */}
                            </p>
                        </button>

                    </div>

                </div>
            )}
                <div className="px-5 lg:px-5 md:px-10 py-3 lg:py-4 flex flex-row items-center justify-between border-t border-gray-300">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="bg-white rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                <input
                                    aria-labelledby="id1"
                                    checked
                                    type="radio"
                                    name="radio"
                                    className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                                />
                                <div className="check-icon hidden border-4 border-black dark:border-gray-700 rounded-full w-full h-full z-1"></div>
                            </div>
                            <p
                                id="id1"
                                className="ml-3 text-base leading-4 font-normal text-gray-800 "
                            >
                                Going
                            </p>
                        </div>
                        <div className="flex items-center ml-6">
                            <div className="bg-white rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                <input
                                    aria-labelledby="id2"
                                    type="radio"
                                    name="radio"
                                    className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                                />
                                <div className="check-icon hidden border-4 border-black dark:border-gray-700 rounded-full w-full h-full z-1"></div>
                            </div>
                            <p
                                id="id2"
                                className="ml-3 text-base leading-4 font-normal text-gray-800 "
                            >
                                Not Going
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            aria-label="save"
                            className="focus:outline-none focus:text-gray-400 hover:text-gray-500 text-gray-600 cursor-pointer mr-4"
                        >
                            <svg
                                className="feather feather-bookmark"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                        <button
                            aria-label="share"
                            className="text-indigo-700 dark:text-indigo-600 hover:text-indigo-500 focus:outline-none focus:text-indigo-500 cursor-pointer"
                        >
                            <svg
                                className="feather feather-share-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            
            </div>
            {/* Image on the right */}
            <div className="relative w-full h-64 lg:h-auto lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
                <img
                    className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none"
                    src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_27.png"
                    alt="banner"
                />
            </div>
            {/* Additional styles */}
            <style>
                {`
          .checkbox:checked {
            border: none;
          }
          .checkbox:checked + .check-icon {
            display: flex;
          }
        `}
            </style>
        </>

    )
}

export default DashBoardEvents;
