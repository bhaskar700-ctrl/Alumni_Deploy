import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/store/jobSlice';
import { Link } from 'react-router-dom';

const JobListPage = () => {


  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (status === 'loading') return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-5">Error: {error}</div>;

  

  return (
    <div>
      <h2 className="text-xl text-center font-bold mb-4">Job Listings</h2>
    
      {auth.isAuthenticated && (
        <Link to="/jobs/create" className="mb-4 inline-block bg-blue-500 text-white p-2 rounded">Create Job</Link>
      )}
      <div className="py-10 grid gap-x-8 gap-y-4 grid-cols-3">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded shadow-md w-fit">
            <div style={{ height: "200px", width: "300px" }}>
              <img
                className="w-full h-full object-cover rounded"
                alt="job"
                src="https://img.freepik.com/premium-psd/we-are-hiring-job-vacancy-social-media-post-template_504779-82.jpg"
              />
            </div>
            <h1 className="text-2xl font-medium mt-2">{job.title}</h1>
            <p className="text-gray-600 text-sm mt-1">{job.description}</p>
            <div className="mt-4">
              <Link to={`/jobs/${job._id}`} className="bg-[#f02e65] text-white py-2 px-4 rounded mr-2">
                View Details
              </Link>
              {(auth.user?.id === job.author || auth.user?.role === 'admin') && (
                <Link to={`/jobs/edit/${job._id}`} className="bg-gray-100 text-gray-700 py-2 px-4 rounded">
                  Edit
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListPage;
