import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import UserProfileSummary from './UserProfileSummary/UserProfileSummary';
import RecentNews from './RecentNews/RecentNews';
import Highlights from './Highlights/Highlights';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import JobBoard from './JobBoard/JobBoard';
import DonationStatistics from './DonationStatistics/DonationStatistics';
// import QuickLinks from './quicklinks/Quicklinks';

const DashboardPage = () => {
    return (
        <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Forum</h1>
      
      {/* Forum Thread List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Sample Thread */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Thread Title</h2>
          <p className="text-gray-700">Thread Description or Preview</p>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Tag1</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#Tag2</span>
          </div>
        </div>
        
        {/* Add more thread elements here */}
        
      </div>
    </div>
    );
};

export default DashboardPage;
