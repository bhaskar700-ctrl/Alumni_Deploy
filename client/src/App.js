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
// Import the job components
// Correct the paths according to the actual component definitions
import JobListPage from './components/JobPostingPage/JobListPage';
import CreateJobPage from './components/JobPostingPage/CreateJobPage'; // Create job page
import JobDetailsPage from './components/JobPostingPage/JobDetailsPage'; // Job details page
import EditJobPage from './components/JobPostingPage/EditJobPage';


function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {isAuthenticated && (
          <div className="flex flex-col md:flex-row">
            <SidebarWithContentSeparator className="md:w-1/4" />
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-full max-w-screen-lg px-4">
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/forum" element={<ForumPage />} />
                  <Route path="/logout" element={<LogoutPage />} />
                  {/* Protected Job Routes */}
                  <Route path="/jobs/create" element={<CreateJobPage />} />
                  <Route path="/jobs/edit/:jobId" element={<EditJobPage />} />
                  <Route path="/jobs" element={<JobListPage />} />
                  <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
                  {/* More protected routes as needed */}
                </Routes>
              </div>
            </div>
          </div>
        )}
        <Routes>
          {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
          <Route path="/" element={<LandingPage />} />
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
