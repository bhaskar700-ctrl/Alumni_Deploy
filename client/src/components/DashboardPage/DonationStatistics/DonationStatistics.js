import React from 'react';
// Import any additional icons or components as needed

const DonationStatistics = () => {
    // Placeholder data, replace with actual data fetching logic
    const donationStats = {
        totalAmount: '150,000',
        totalDonors: '320',
        recentDonation: '1,000',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Donation Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stat-item">
                    <h4 className="stat-title font-medium text-gray-700">Total Amount Raised</h4>
                    <p className="stat-value text-lg font-semibold text-indigo-600">${donationStats.totalAmount}</p>
                </div>
                <div className="stat-item">
                    <h4 className="stat-title font-medium text-gray-700">Total Donors</h4>
                    <p className="stat-value text-lg font-semibold text-indigo-600">{donationStats.totalDonors}</p>
                </div>
                <div className="stat-item">
                    <h4 className="stat-title font-medium text-gray-700">Recent Donation</h4>
                    <p className="stat-value text-lg font-semibold text-indigo-600">${donationStats.recentDonation}</p>
                </div>
            </div>
        </div>
    );
};

export default DonationStatistics;
