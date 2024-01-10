import React from 'react';
// Import icons or additional components if needed

const RecentNews = () => {
    // Placeholder data, replace with actual data fetching logic
    const newsItems = [
        { 
            title: 'Alumni Reunion Announced', 
            date: 'March 15, 2024',
            description: 'Join us for our annual alumni reunion, featuring guest speakers and networking opportunities.' 
        },
        { 
            title: 'New Scholarship Program', 
            date: 'March 10, 2024',
            description: 'Applications are open for our new scholarship program aimed at supporting lifelong learning.' 
        },
        // Add more news items
    ];

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
            <h3 className="text-xl font-semibold mb-4">Recent News</h3>
            <div className="space-y-4">
                {newsItems.map((item, index) => (
                    <div key={index} className="news-item">
                        <h4 className="news-title font-medium">{item.title}</h4>
                        <p className="news-date text-sm text-gray-500">{item.date}</p>
                        <p className="news-description text-gray-700">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentNews;
