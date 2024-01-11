import React from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import UserProfileSummary from './UserProfileSummary/UserProfileSummary';
import RecentNews from './RecentNews/RecentNews';
import Highlights from './Highlights/Highlights';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import JobBoard from './JobBoard/JobBoard';
import DonationStatistics from './DonationStatistics/DonationStatistics';
import QuickLinks from './quicklinks/Quicklinks';

const DashboardPage = () => {
    return (
        <div className="bg-blue-200 min-h-screen">
            <DashboardHeader />
            <div className="flex overflow-hidden">
                <DashboardSidebar />
                <main className="flex-grow p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-1">
                            <UserProfileSummary />
                            <QuickLinks />
                        </div>
                        <div className="lg:col-span-2">
                            <Highlights />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <RecentNews />
                                <UpcomingEvents />
                            </div>
                            <JobBoard />
                            <DonationStatistics />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
