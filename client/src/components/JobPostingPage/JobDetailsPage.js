import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../redux/store/jobSlice'; // Adjust the import path to where your jobSlice is

const JobDetailsPage = () => {
    const { jobId } = useParams(); // Get the jobId from the URL
    const dispatch = useDispatch();
    const job = useSelector((state) => state.jobs.currentJob); // Assuming currentJob holds the details of the job
    const { status, error } = useSelector((state) => state.jobs); // Assuming you track the status of fetch operations

    useEffect(() => {
        if (jobId) {
            dispatch(fetchJobById(jobId));
        }
    }, [dispatch, jobId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!job) {
        return <div>No job found</div>;
    }

    return (
        <div className="job-details">
            <h2>{job.title}</h2>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            {job.applyLink && (
                <p><strong>How to Apply:</strong> <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Here</a></p>
            )}
        </div>
    );
};

export default JobDetailsPage;
