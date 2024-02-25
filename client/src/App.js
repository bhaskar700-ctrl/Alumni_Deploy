import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import './styles/index.css'; // Assuming Tailwind is imported here
import Navbar from './components/common/Navbar/Navbar';
import { SidebarWithContentSeparator } from './components/common/LeftNavbar/LeftNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/common/Footer/Footer';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import ForumPage from './components/ForumPage/ForumPage';

function App() {
  // Access the isAuthenticated part of the state
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {isAuthenticated && (
          <div className="flex flex-col md:flex-row"> {/* Adjust layout for responsiveness */}
            <SidebarWithContentSeparator className="md:w-1/4" />
            <div className="flex flex-col justify-center items-center w-full">
              <div className="w-full max-w-screen-lg px-4"> {/* Add padding */}
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/forum" element={<ForumPage />} />
                  {/* More protected routes as needed */}
                </Routes>
              </div>
            </div>
          </div>
        )}
        <Routes>
          {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
          <Route path="/" element={<LandingPage />} />
          {!isAuthenticated && <Route path="/dashboard" element={<LoginPage />} />}
          {/* Other public routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
