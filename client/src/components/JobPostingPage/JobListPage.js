import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/store/jobSlice';
import { Link } from 'react-router-dom'; // Import Link

const JobListPage = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const auth = useSelector((state) => state.auth); // Access the auth state to check user permissions

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (status === 'loading') return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-5">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Job Listings</h2>
        {auth.isAuthenticated && (
          <Link to="/jobs/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Job
          </Link>
        )}
      </div>
      <ul>
        {jobs.map((job) => (
          <li key={job._id} className="bg-white shadow overflow-hidden mb-5 rounded-md">
            <Link to={`/jobs/${job._id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-5 sm:px-6 border-b flex justify-between items-center">
                <h3 className="text-xl leading-6 font-medium text-gray-900">{job.title}</h3>
                {/* Conditionally render the edit link if the user is authenticated and is the job author or an admin */}
                {(auth.user?.id === job.author || auth.user?.role === 'admin') && (
                  <Link to={`/jobs/edit/${job._id}`} className="text-blue-500 hover:text-blue-700">
                    Edit
                  </Link>
                )}
              </div>
              <div className="px-4 py-5 sm:p-6">
                <p className="text-sm text-gray-500">{job.description}</p>
                {/* Add more job details here */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListPage;
