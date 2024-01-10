import React from 'react';
// Import any additional icons or components as needed

const JobBoard = () => {
    // Placeholder data, replace with actual data fetching logic
    const jobListings = [
        { 
            title: 'Senior Graphic Designer at Creativex', 
            location: 'San Francisco, CA',
            description: 'Seeking a creative professional with 5+ years of experience in digital design.' 
        },
        { 
            title: 'Marketing Director at MarketGurus', 
            location: 'New York, NY',
            description: 'Looking for an experienced marketing director to lead our dynamic marketing team.' 
        },
        // More job listings...
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Job Board</h3>
            <div className="space-y-4">
                {jobListings.map((job, index) => (
                    <div key={index} className="job-listing">
                        <h4 className="job-title font-medium">{job.title}</h4>
                        <p className="job-location text-sm text-gray-500">{job.location}</p>
                        <p className="job-description text-gray-700">{job.description}</p>
                        <a href="/jobs" className="text-indigo-600 hover:text-indigo-800">View Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobBoard;
