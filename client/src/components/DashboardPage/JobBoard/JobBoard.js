import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../../redux/store/jobSlice';
import { Link } from 'react-router-dom';

function JobBoard() {
    const dispatch = useDispatch();
    const { jobs, status, error } = useSelector((state) => state.jobs);
    const auth = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(fetchJobs());
    }, [dispatch]);
  
    if (status === 'loading') return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-5">Error: {error}</div>;
  
    // Get the latest job
    const latestJob = jobs.length > 0 ? jobs[0] : null;

  return (
    <div>
       <div className="flex items-center justify-center py-8 px-4">
       {latestJob && (
          <div className="md:w-96 rounded shadow-lg py-4 px-5 bg-white ">
            <a
              tabIndex="0"
              role="link"
              className="focus:outline-none focus:text-indigo-700 focus:underline hover:text-indigo-700 hover:underline text-lg font-bold leading-4 text-gray-800 "
            >
              {latestJob.title}
            </a>
            <h2 className="pt-2 text-xs leading-3  text-gray-600 ">
            {latestJob.description}
            </h2>
            <p className="pt-4 text-xs leading-4 text-gray-600 dark:text-gray-500">
              Join Tailwind UI Kit’s discord community and kickstart your next
              project with beautiful, accessible user interfaces.
            </p>
            <div className="flex items-center pt-4">
              <div className="w-6 h-6 mr-1 shadow rounded-full">
                <img
                  alt="img-1"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>
              {/* Add more avatar images as needed */}
              <div className="w-6 h-6 mr-1 border-dashed border flex items-center justify-center cursor-pointer rounded-full">
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card8-svg1.svg"
                  alt="plus"
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-indigo-700 leading-none text-right pb-1">
                73%
              </p>
            </div>
            <div className="w-full h-2 relative bg-gray-200 rounded-full">
              <div className="h-2 w-60 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 rounded-full"></div>
            </div>
            <button className="focus:outline-none focus:bg-opacity-50 focus:text-black hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-indigo-700 hover:bg-opacity-50 bg-gray-100 text-sm font-medium py-3 w-full rounded mt-5">
            <Link to={`/jobs/${latestJob._id}`} >View Project Details
             </Link>
            </button>
             
          </div>
       )}
        </div>
    </div>
  )
}

export default JobBoard
