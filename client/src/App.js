import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/index.css';
import Navbar from './components/common/Navbar/Navbar';
import { SidebarWithContentSeparator } from './components/common/LeftNavbar/LeftNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/common/Footer/Footer';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import ForumPage from './components/ForumPage/ForumPage';
import LogoutPage from './components/LogOutPage/LogOutPage';
import Signup from './components/Signup/Signup';
import ChatPage from './components/ChatPage/ChatPage';
import Donation from './components/DonationPage/Donation';
// Import the job components
// Correct the paths according to the actual component definitions
import JobListPage from './components/JobPostingPage/JobListPage';
import CreateJobPage from './components/JobPostingPage/CreateJobPage'; // Create job page
import JobDetailsPage from './components/JobPostingPage/JobDetailsPage'; // Job details page
import EditJobPage from './components/JobPostingPage/EditJobPage';
import UploadCSV from './components/UploadCSV/UploadCSV';
import Contact from './components/Contact/Contact';
// Import the event components
import EventListPage from './components/EventPage/EventListPage';
import CreateEventPage from './components/EventPage/CreateEventPage';
import EditEventPage from './components/EventPage/EditEventPage';
import EventDetailsPage from './components/EventPage/EventDetailsPage';

import EditProfilePage from './components/ProfilePage/EditProfilePage';
import UpdatePrivacySettingsPage from './components/ProfilePage/UpdatePrivacyPage';
import UserProfilePage from './components/ProfilePage/UserProfilePage';


import UserDirectoryPage from './components/UserDirectoryPage/UserDirectoryPage';
import UserDirectoryProfilePage from './components/UserDirectoryPage/UserProfilePage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {isAuthenticated && (
          <div className="flex flex-col md:flex-row">
            <SidebarWithContentSeparator className="md:w-1/4" />
            <div className="flex flex-col mt-15 w-full">
              <div className="w-full h-100vh  px-4">
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="/logout" element={<LogoutPage />} />
                  <Route path="/upload" element={<UploadCSV />} />
                  <Route path="/donation" element={<Donation />} />
                  {/* Protected Job Routes */}
                  
                  <Route path="/jobs/create" element={<CreateJobPage />} />
                  <Route path="/jobs/edit/:jobId" element={<EditJobPage />} />
                  <Route path="/jobs" element={<JobListPage />} />
                  <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

                  {/* Protected Event Routes */}
                  <Route path="/events/create" element={<CreateEventPage />} />
                  <Route path="/events/edit/:eventId" element={<EditEventPage />} />
                  <Route path="/events" element={<EventListPage />} />
                  <Route path="/events/:eventId" element={<EventDetailsPage />} />
                  {/* More protected routes as needed */}

                  <Route path="/edit-profile/:userId" element={<EditProfilePage />} />
                  <Route path="/update-privacy/:userId" element={<UpdatePrivacySettingsPage />} />
                  <Route path="/profile/:userId" element={<UserProfilePage />} />
                  <Route path="/messages" element={<ChatPage />} />

                  {/* Add User Directory route */}
                  <Route path="/user-directory" element={<UserDirectoryPage />} />
                  <Route path="/user-directory/profile/:userId" element={<UserDirectoryProfilePage />} />
                  

                  {/* More protected routes as needed */}


                </Routes>
              </div>
            </div>
          </div>
        )}
        <Routes>
          {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
          <Route path="/" element={<LandingPage />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/contact" element={<Contact />} />
          {/* Public Job Routes */}
          
          {!isAuthenticated && <Route path="/dashboard" element={<LoginPage />} />}
          {/* Other public routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
